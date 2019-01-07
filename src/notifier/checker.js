'use strict'

const debug = require('debug')('elint:notifier:checker')
const co = require('co')
const semver = require('semver')
const getPresetInfo = require('./get-preset-info')
const fetchRegistryInfo = require('./fetch-registry-info')
const config = require('./config')

co(function * () {
  const presetInfo = getPresetInfo()

  debug('preset info: %o', presetInfo)

  // 找不到本地安装的 preset
  if (!presetInfo) {
    return null
  }

  const { registryUrl, name } = presetInfo
  const latestPresetInfo = yield fetchRegistryInfo(registryUrl, name)

  // 获取仓库数据失败
  if (!latestPresetInfo) {
    return null
  }

  const latestPresetVersion = latestPresetInfo.version
  const presetUpdateCheckInterval = latestPresetInfo.elint && typeof latestPresetInfo.elint.updateCheckInterval === 'number'
    ? latestPresetInfo.elint.updateCheckInterval
    : 0

  // 禁用 & 未设置更新检查周期
  if (presetUpdateCheckInterval <= 0) {
    return null
  }

  // latestPresetVersion <= presetInfo.version, 无需更新
  if (!semver.gt(latestPresetVersion, presetInfo.version)) {
    return null
  }

  // 未到更新时间
  if (Date.now() - config.getLastNotifyTime() <= presetUpdateCheckInterval) {
    return null
  }

  return latestPresetVersion
})