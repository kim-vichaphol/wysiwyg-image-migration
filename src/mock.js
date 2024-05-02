const mockArticles = [
  {
    body: 'I want [[wysiwyg_imageupload:123:]] to be [[wysiwyg_imageupload:345:]]',
    body2: 'Additional body 2',
    body3: 'Additional body 3',
    iid: '123',
    filepath: 'path/a1'
  },
  {
    body: 'I want [[wysiwyg_imageupload:123:]] to be [[wysiwyg_imageupload:345:]]',
    body2: 'Additional body 2',
    body3: 'Additional body 3',
    iid: '345',
    filepath: 'path/a2'
  },
  {
    body: 'I want [[wysiwyg_imageupload:555:]] to be [[wysiwyg_imageupload:777:]]',
    body2: 'Additional body 2',
    body3: 'Additional body 3',
    iid: '555',
    filepath: 'path/a3',
    image_title: 'test-title'
  },
  {
    body: 'I want [[wysiwyg_imageupload:555:]] to be [[wysiwyg_imageupload:777:]]',
    body2: 'Additional body 2',
    body3: 'Additional body 3',
    iid: '777',
    filepath: 'path/a4'
  },
  {
    body: 'I want [[wysiwyg_imageupload:12341234:]] to be [[wysiwyg_imageupload:1234123412:]]',
    body2: 'Additional body 12341234',
    body3: 'Additional body 1234123412',
    iid: undefined,
    filepath: undefined
  },
  {
    body: 'I want [[wysiwyg_imageupload:552235:]] to be be [[wysiwyg_imageupload:71232177:]]',
    body2: 'Additional body 552235',
    body3: 'Additional body 71232177',
    iid: '5243234234',
    filepath: 'path/a5243234234'
  }
]

module.exports = {
  mockArticles
}
