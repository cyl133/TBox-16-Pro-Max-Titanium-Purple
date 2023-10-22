import { BrowserWindow, Menu, Tray } from 'electron'
import * as path from 'path'

export class TrayBuilder {
  tray: Tray | null
  mainWindow: BrowserWindow | null

  constructor(mainWindow: BrowserWindow | null) {
    this.tray = null
    this.mainWindow = mainWindow
  }

  getWindowPosition = (): { x: number; y: number } | undefined => {
    if (this.mainWindow == null || this.tray == null) {
      return undefined
    }

    const windowBounds = this.mainWindow.getBounds()
    const { x, y, width, height } = this.tray.getBounds()
    const posX = Math.round(x + width / 2 - windowBounds.width / 2)
    const posY = Math.round(y + height)

    return { x: posX, y: posY }
  }

  showWindow = (): void => {
    const position = this.getWindowPosition()
    if (this.mainWindow == null || position == null) {
      return
    }

    this.mainWindow.setPosition(position.x, position.y, false)
    this.mainWindow.show()
    this.mainWindow.setVisibleOnAllWorkspaces(true)
    this.mainWindow.focus()
    this.mainWindow.setVisibleOnAllWorkspaces(false)
  }

  toggleWindow = (): void => {
    if (this.mainWindow == null) {
      return
    }
    this.mainWindow.isVisible() ? this.mainWindow.hide() : this.showWindow()
  }

  onRightClick = (): void => {
    if (this.tray == null) {
      return
    }
    const menu: Electron.MenuItemConstructorOptions[] = [
      {
        role: 'quit',
        accelerator: 'Command+Q',
        label: 'Quit Routines Mini'
      }
    ]
    this.tray.popUpContextMenu(Menu.buildFromTemplate(menu))
  }

  build = (): void => {
    this.tray = new Tray(
      path.join('/Users/sean/Coding/HackHarvard2023/electron-vite/src/main/icon.png')
    )
    this.tray.setIgnoreDoubleClickEvents(true)

    this.tray.on('click', this.toggleWindow)
    this.tray.on('right-click', this.onRightClick)
  }
}
