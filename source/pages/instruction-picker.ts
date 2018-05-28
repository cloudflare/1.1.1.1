import platform from 'platform'

interface DeviceInfo {
  id: string
  label: string
}

const deviceInfo: { [index: string]: DeviceInfo } = {
  'Windows': {
    label: 'PC',
    id: 'windows'
  },
  'OS X': {
    label: 'Mac',
    id: 'mac-os'
  },
  'Linux': {
    label: 'Linux',
    id: 'linux'
  },
  'iOS': {
    label: 'iOS',
    id: 'iphone'
  },
  'Android': {
    label: 'Android',
    id: 'android'
  },
  'Router': {
    label: 'a router',
    id: 'router'
  }
}

function ref(ref: string): HTMLElement {
  return <HTMLElement>document.querySelector(`[data-ref="${ref}"]`)!
}

export default function initInstructionPicker () {
  const $el = {
    instructionPicker: ref('instructionPicker'),
    instructionChoices: Array.prototype.slice.call(ref('instructionPicker').querySelectorAll('.choice')),
    deviceLabel: ref('deviceLabel'),
    setupSection: ref('setup')
  }

  function chooseInstructions (platformId: string) {
    $el.instructionChoices.forEach((choice: HTMLElement) => {
      choice.classList.toggle('selected', choice.dataset.platform === platformId)
    })

    let device: DeviceInfo

    for (let key in deviceInfo) {
      const entry = deviceInfo[key]
      if (platformId === entry.id) {
        device = deviceInfo[key]
        break
      }
    }

    if (!device!) return

    $el.setupSection.dataset.platform = platformId
    $el.deviceLabel.textContent = $el.deviceLabel.dataset.label!.replace('{{device}}', device!.label)
  }

  Object.assign(window, {chooseInstructions})

  $el.instructionChoices.forEach((choice: HTMLElement) => {
    choice.addEventListener('click', chooseInstructions.bind(null, choice.dataset.platform))
  })

  let device: DeviceInfo = deviceInfo['OS X']

  if (platform.os && platform.os.family && deviceInfo.hasOwnProperty(platform.os.family)) {
    device = deviceInfo[platform.os.family]
  }
  chooseInstructions(device.id)
}
