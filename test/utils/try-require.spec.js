'use strict';

const path = require('path');
const unmock = require('../mock')();
const tryRequire = require('../../lib/utils/try-require');

const mocha = require('mocha');
const chai = require('chai');
const should = chai.should();

describe('try-require 测试', function () {

  after(() => unmock);

  it('边界条件', function () {
    return tryRequire().should.be.deep.equal([]);
  });

  it('模块不存在', function () {
    return tryRequire(/name/).should.be.deep.equal([])
      && tryRequire(/hello/).should.be.deep.equal([]);
  });

  it('模块存在', function () {
    const result1 = [
      'elint-preset-node',
      'elint-preset-normal'
    ];

    const result2 = [
      'elint-preset-node'
    ];

    return tryRequire(/^elint\-preset/).should.be.deep.equal(result1)
      && tryRequire(/elint/).should.be.deep.equal(result1)
      && tryRequire(/node/).should.be.deep.equal(result2);
  });
});