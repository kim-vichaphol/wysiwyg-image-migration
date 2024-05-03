const { buildCSVFromJSON } = require('./buildCSVFromJSON')
const { createCSVFile } = require('./createCSVFile')
const { processJSONArticlesToCSV } = require('./processJSONArticlesToCSV')

jest.mock('./buildCSVFromJSON')
jest.mock('./createCSVFile')
jest.mock('./logger.js')

describe('processJSONArticlesToCSV', () => {
  const testOutputName = 'test-file-name'

  it('calls createCSVFile() with undefined when JSON is empty', () => {
    jest.mocked(createCSVFile)

    processJSONArticlesToCSV([], testOutputName)

    expect(createCSVFile).toHaveBeenCalledWith(undefined, testOutputName)
  })

  describe('calling buildCSVFromJSON() with correct input JSON', () => {
    const createRequiredHTMLTag = (filepath) =>
      `<span style=\"display: flex;flex-direction: column;align-items: center;\"><img src=\"${filepath}\" /></span>`

    const createRequiredHTMLTagWithImageTitle = (filepath, title) =>
      `<span style=\"display: flex;flex-direction: column;align-items: center;\"><img src=\"${filepath}\" /><span style=\"font-size:0.75rem;\">${title}</span></span>`

    beforeEach(() => {
      jest.mocked(buildCSVFromJSON)
    })

    it('calls correctly when 2 input articles has same body JSON', () => {
      const mockArticles = [
        {
          body: 'I want [[wysiwyg_imageupload:123:]] to be [[wysiwyg_imageupload:345:]]',
          otherAttribute: 'Additional content',
          iid: '123',
          filepath: 'path/a1'
        },
        {
          body: 'I want [[wysiwyg_imageupload:123:]] to be [[wysiwyg_imageupload:345:]]',
          otherAttribute: 'Additional content',
          iid: '345',
          filepath: 'path/a2'
        }
      ]
      const expected = [
        {
          body: `I want ${createRequiredHTMLTag('path/a1')} to be ${createRequiredHTMLTag('path/a2')}`,
          otherAttribute: 'Additional content'
        }
      ]

      processJSONArticlesToCSV(mockArticles, testOutputName)

      expect(buildCSVFromJSON).toHaveBeenCalledWith(expected)
    })

    it('calls correctly when 4 input articles has 2 same body JSON', () => {
      const mockArticles = [
        {
          body: 'I want [[wysiwyg_imageupload:123:]] to be [[wysiwyg_imageupload:345:]]',
          otherAttribute: 'Additional content',
          iid: '123',
          filepath: 'path/a1'
        },
        {
          body: 'I want [[wysiwyg_imageupload:123:]] to be [[wysiwyg_imageupload:345:]]',
          otherAttribute: 'Additional content',

          iid: '345',
          filepath: 'path/a2'
        },
        {
          body: 'I want [[wysiwyg_imageupload:555:]] to be [[wysiwyg_imageupload:777:]]',
          otherAttribute: 'Additional content',
          iid: '555',
          filepath: 'path/a3'
        },
        {
          body: 'I want [[wysiwyg_imageupload:555:]] to be [[wysiwyg_imageupload:777:]]',
          otherAttribute: 'Additional content',
          iid: '777',
          filepath: 'path/a4'
        }
      ]
      const expected = [
        {
          body: `I want ${createRequiredHTMLTag('path/a1')} to be ${createRequiredHTMLTag('path/a2')}`,
          otherAttribute: 'Additional content'
        },
        {
          body: `I want ${createRequiredHTMLTag('path/a3')} to be ${createRequiredHTMLTag('path/a4')}`,
          otherAttribute: 'Additional content'
        }
      ]

      processJSONArticlesToCSV(mockArticles, testOutputName)

      expect(buildCSVFromJSON).toHaveBeenCalledWith(expected)
    })

    it('calls correctly when an input article has image title attribute', () => {
      const mockArticles = [
        {
          body: 'I want [[wysiwyg_imageupload:123:]] to be [[wysiwyg_imageupload:345:]]',
          otherAttribute: 'Additional content',
          iid: '123',
          filepath: 'path/a1',
          image_title: 'test-title'
        },
        {
          body: 'I want [[wysiwyg_imageupload:123:]] to be [[wysiwyg_imageupload:345:]]',
          otherAttribute: 'Additional content',
          iid: '345',
          filepath: 'path/a2'
        }
      ]
      const expected = [
        {
          body: `I want ${createRequiredHTMLTagWithImageTitle('path/a1', 'test-title')} to be ${createRequiredHTMLTag(
            'path/a2'
          )}`,
          otherAttribute: 'Additional content'
        }
      ]

      processJSONArticlesToCSV(mockArticles, testOutputName)

      expect(buildCSVFromJSON).toHaveBeenCalledWith(expected)
    })

    it('calls correctly when an input article has iid and filepath attribute as undefined', () => {
      const mockArticles = [
        {
          body: 'I want [[wysiwyg_imageupload:12341234:]] to be [[wysiwyg_imageupload:1234123412:]]',
          otherAttribute: 'Additional content',
          iid: undefined,
          filepath: undefined
        }
      ]
      const expected = [
        {
          body: `I want [[wysiwyg_imageupload:12341234:]] to be [[wysiwyg_imageupload:1234123412:]]`,
          otherAttribute: 'Additional content'
        }
      ]

      processJSONArticlesToCSV(mockArticles, testOutputName)

      expect(buildCSVFromJSON).toHaveBeenCalledWith(expected)
    })

    it('calls correctly when an input article does NOT have matching iid and filepath with body attribute', () => {
      const mockArticles = [
        {
          body: 'I want [[wysiwyg_imageupload:12341234:]]',
          otherAttribute: 'Additional content',
          iid: '1',
          filepath: 'path/a1'
        }
      ]
      const expected = [
        {
          body: `I want `,
          otherAttribute: 'Additional content'
        }
      ]

      processJSONArticlesToCSV(mockArticles, testOutputName)

      expect(buildCSVFromJSON).toHaveBeenCalledWith(expected)
    })

    it('calls correctly when input articles have all scenarios including image_title, undefined attribute, un-matched iid attribute', () => {
      const mockArticles = [
        {
          body: 'I want [[wysiwyg_imageupload:123:]] to be [[wysiwyg_imageupload:345:]]',
          otherAttribute: 'Additional content',
          iid: '123',
          filepath: 'path/a1'
        },
        {
          body: 'I want [[wysiwyg_imageupload:123:]] to be [[wysiwyg_imageupload:345:]]',
          otherAttribute: 'Additional content',
          iid: '345',
          filepath: 'path/a2'
        },
        {
          body: 'I want [[wysiwyg_imageupload:555:]] to be [[wysiwyg_imageupload:666:]]',
          otherAttribute: 'Additional content',
          iid: '555',
          filepath: 'path/a3',
          image_title: 'test-title'
        },
        {
          body: 'I want [[wysiwyg_imageupload:555:]] to be [[wysiwyg_imageupload:666:]]',
          otherAttribute: 'Additional content',
          iid: '666',
          filepath: 'path/a4'
        },
        {
          body: 'I want [[wysiwyg_imageupload:12341234:]] to be [[wysiwyg_imageupload:1234123412:]]',
          otherAttribute: 'Additional content',
          iid: undefined,
          filepath: undefined
        },
        {
          body: 'I want [[wysiwyg_imageupload:12341234:]]',
          otherAttribute: 'Additional content',
          iid: '1',
          filepath: 'path/a1'
        }
      ]
      const expected = [
        {
          body: `I want ${createRequiredHTMLTag('path/a1')} to be ${createRequiredHTMLTag('path/a2')}`,
          otherAttribute: 'Additional content'
        },
        {
          body: `I want ${createRequiredHTMLTagWithImageTitle('path/a3', 'test-title')} to be ${createRequiredHTMLTag(
            'path/a4'
          )}`,
          otherAttribute: 'Additional content'
        },
        {
          body: `I want [[wysiwyg_imageupload:12341234:]] to be [[wysiwyg_imageupload:1234123412:]]`,
          otherAttribute: 'Additional content'
        },
        {
          body: `I want `,
          otherAttribute: 'Additional content'
        }
      ]

      processJSONArticlesToCSV(mockArticles, testOutputName)

      expect(buildCSVFromJSON).toHaveBeenCalledWith(expected)
    })

    it('calls correctly when input article is empty', () => {
      processJSONArticlesToCSV([], testOutputName)

      expect(buildCSVFromJSON).toHaveBeenCalledWith([])
    })
  })
})
