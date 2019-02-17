import platform from 'platform'

const os = platform.os!.family!.toLowerCase()

export const bannerOs = ['ios', 'android'].indexOf(os) !== -1 ? os : 'others'
