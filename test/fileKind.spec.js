import { classifyFile, loadErrorMessage } from '@/utils/fileKind'

describe('classifyFile', () => {
  test.each([
    [{ name: 'a.pdf', type: 'application/pdf' }, 'pdf'],
    [{ name: 'a.PDF', type: '' }, 'pdf'],
    [{ name: 'a.png', type: 'image/png' }, 'image'],
    [{ name: 'a.jpg', type: 'image/jpeg' }, 'image'],
    [{ name: 'a.txt', type: 'text/plain' }, 'unsupported'],
    [{ name: 'a.zip', type: '' }, 'unsupported']
  ])('%o is %s', (file, kind) => {
    expect(classifyFile(file)).toBe(kind)
  })
})

describe('loadErrorMessage', () => {
  test('unsupported files ask for a PDF or an image', () => {
    expect(loadErrorMessage('unsupported')).toMatch(/PDF or an image/)
  })

  test('password protected PDFs are explained', () => {
    expect(loadErrorMessage('pdf', { name: 'PasswordException' })).toMatch(/password/)
  })

  test('other PDF errors say the PDF could not be read', () => {
    expect(loadErrorMessage('pdf', { name: 'InvalidPDFException' })).toMatch(/Could not read this PDF/)
  })

  test('image errors say the image could not be read', () => {
    expect(loadErrorMessage('image', new Error('x'))).toMatch(/Could not read this image/)
  })
})
