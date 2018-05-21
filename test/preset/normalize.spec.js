'use strict';

const normalize = require('../../lib/preset/normalize');

const mocha = require('mocha');
const chai = require('chai');
const should = chai.should();

describe('Normalize 测试', function () {

  it('空测试', function () {
    const name1 = undefined;
    const name2 = '';

    return should.not.exist(normalize(name1))
      && normalize(name2).should.equal(name2);
  });

  it('正常情况', function () {
    return normalize('name').should.equal('elint-preset-name')
      && normalize('elint-preset-name').should.equal('elint-preset-name')
      && normalize('elint-preset-na-me').should.equal('elint-preset-na-me');
  });

});