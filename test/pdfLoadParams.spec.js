import { buildPdfLoadParams } from '@/utils/pdfLoadParams'

describe('buildPdfLoadParams', () => {
  test('passes the URL through', () => {
    expect(buildPdfLoadParams('blob:http://localhost/abc').url).toBe('blob:http://localhost/abc')
  })

  test('disables eval to block CVE-2024-4367 font payloads', () => {
    expect(buildPdfLoadParams('x.pdf').isEvalSupported).toBe(false)
  })
})
