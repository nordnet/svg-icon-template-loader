import sinon from 'sinon';
import { expect } from 'chai';
import loaderUtils from 'loader-utils';

import svgIconLoader from '../src';
import svgo from '../src/svgo';
import toTemplate from '../src/toTemplate';

import svg from './svg';

describe('svgIconLoader', () => {
  let sandbox;
  let asyncSpy;

  const query = 'query';
  const context = { query };
  const content = {};
  const svgoConfig = {};

  function setupSandbox({ parseQuery, stubToTemplate }) {
    sandbox = sinon.sandbox.create();
    context.cacheable = sandbox.stub();
    asyncSpy = sinon.spy();
    context.async = () => asyncSpy;
    sandbox.stub(svgo, 'svgo', () => {});
    sandbox.stub(loaderUtils, 'parseQuery', () => parseQuery);

    if (stubToTemplate) {
      sandbox.stub(toTemplate, 'toTemplateFunction', () => {});
    } else {
      sandbox.spy(toTemplate, 'toTemplateFunction');
    }

    svgIconLoader.call(context, content);
    svgo.svgo.getCall(0).args[2]({ data: svg });
  }

  describe('query with svgo', () => {
    beforeEach(() => setupSandbox({
      parseQuery: { svgoConfig, svgo: true },
    }));

    it('should call svgo once', () => expect(svgo.svgo).to.have.been.calledOnce);
    it('should call svgo with expected arguments', () => expect(svgo.svgo).to.have.been.calledWith(content, svgoConfig));

    it('should return callback with expected args', () => expect(toTemplate.toTemplateFunction).to.have.been.calledWith(svg));

    it('should run async callback once', () => expect(asyncSpy).to.have.been.calledOnce);
    it('should run async callback with expected args',
      () => expect(asyncSpy).to.have.been.calledWith(null, toTemplate.toTemplateFunction(svg)));

    it('should call cacheable', () => expect(context.cacheable).to.have.been.calledOnce);
    it('should call parseQuery once', () => expect(loaderUtils.parseQuery).to.have.been.calledOnce);
    it('should call parseQuery with expected query', () => expect(loaderUtils.parseQuery).to.have.been.calledWith(query));

    afterEach(() => sandbox.restore());
  });

  describe('query without svgo', () => {
    beforeEach(() => setupSandbox({
      parseQuery: { svgoConfig, svgo: false },
      stubToTemplate: true,
    }));

    it('should call svgo once', () => expect(svgo.svgo).to.have.been.calledOnce);
    it('should call svgo with expected arguments', () => expect(svgo.svgo).to.have.been.calledWith(content, svgoConfig));

    it('should return callback with expected args', () => expect(toTemplate.toTemplateFunction).to.have.been.calledWith(content));

    it('should run async callback once', () => expect(asyncSpy).to.have.been.calledOnce);
    it('should run async callback with expected args',
      () => expect(asyncSpy).to.have.been.calledWith(null, toTemplate.toTemplateFunction(content)));

    it('should call cacheable', () => expect(context.cacheable).to.have.been.calledOnce);
    it('should call parseQuery once', () => expect(loaderUtils.parseQuery).to.have.been.calledOnce);
    it('should call parseQuery with expected query', () => expect(loaderUtils.parseQuery).to.have.been.calledWith(query));

    afterEach(() => sandbox.restore());
  });
});
