// originalJson は、 marunyan.png 画像を
// Google Cloud Vision API で解析した結果だよ。
// これを paragraph ごとに整理して export するのが、このファイルの役割だよ。

const originalJson = {
  fullTextAnnotation: {
    pages: [
      {
        blocks: [
          {
            blockType: 'TEXT',
            boundingBox: {
              vertices: [
                {
                  x: 24,
                  y: 61
                },
                {
                  x: 420,
                  y: 61
                },
                {
                  x: 420,
                  y: 282
                },
                {
                  x: 24,
                  y: 282
                }
              ]
            },
            confidence: 0.9732988,
            paragraphs: [
              {
                boundingBox: {
                  vertices: [
                    {
                      x: 24,
                      y: 61
                    },
                    {
                      x: 236,
                      y: 61
                    },
                    {
                      x: 236,
                      y: 98
                    },
                    {
                      x: 24,
                      y: 98
                    }
                  ]
                },
                confidence: 0.9904856,
                words: [
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 24,
                          y: 61
                        },
                        {
                          x: 236,
                          y: 61
                        },
                        {
                          x: 236,
                          y: 98
                        },
                        {
                          x: 24,
                          y: 98
                        }
                      ]
                    },
                    confidence: 0.9904856,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 24,
                              y: 61
                            },
                            {
                              x: 57,
                              y: 61
                            },
                            {
                              x: 57,
                              y: 98
                            },
                            {
                              x: 24,
                              y: 98
                            }
                          ]
                        },
                        confidence: 0.97782004,
                        text: 'こ'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 65,
                              y: 61
                            },
                            {
                              x: 104,
                              y: 61
                            },
                            {
                              x: 104,
                              y: 98
                            },
                            {
                              x: 65,
                              y: 98
                            }
                          ]
                        },
                        confidence: 0.9907918,
                        text: 'ん'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 108,
                              y: 61
                            },
                            {
                              x: 149,
                              y: 61
                            },
                            {
                              x: 149,
                              y: 98
                            },
                            {
                              x: 108,
                              y: 98
                            }
                          ]
                        },
                        confidence: 0.9965042,
                        text: 'に'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 148,
                              y: 61
                            },
                            {
                              x: 188,
                              y: 61
                            },
                            {
                              x: 188,
                              y: 98
                            },
                            {
                              x: 148,
                              y: 98
                            }
                          ]
                        },
                        confidence: 0.99716866,
                        text: 'ち'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 191,
                              y: 61
                            },
                            {
                              x: 236,
                              y: 61
                            },
                            {
                              x: 236,
                              y: 98
                            },
                            {
                              x: 191,
                              y: 98
                            }
                          ]
                        },
                        confidence: 0.9901433,
                        property: {
                          detectedBreak: {
                            type: 'LINE_BREAK'
                          }
                        },
                        text: 'は'
                      }
                    ]
                  }
                ]
              },
              {
                boundingBox: {
                  vertices: [
                    {
                      x: 51,
                      y: 122
                    },
                    {
                      x: 410,
                      y: 122
                    },
                    {
                      x: 410,
                      y: 213
                    },
                    {
                      x: 51,
                      y: 213
                    }
                  ]
                },
                confidence: 0.95228195,
                words: [
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 51,
                          y: 122
                        },
                        {
                          x: 174,
                          y: 122
                        },
                        {
                          x: 174,
                          y: 213
                        },
                        {
                          x: 51,
                          y: 213
                        }
                      ]
                    },
                    confidence: 0.9214504,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 51,
                              y: 122
                            },
                            {
                              x: 129,
                              y: 122
                            },
                            {
                              x: 129,
                              y: 213
                            },
                            {
                              x: 51,
                              y: 213
                            }
                          ]
                        },
                        confidence: 0.9077176,
                        text: 'ま'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 70,
                              y: 122
                            },
                            {
                              x: 174,
                              y: 122
                            },
                            {
                              x: 174,
                              y: 213
                            },
                            {
                              x: 70,
                              y: 213
                            }
                          ]
                        },
                        confidence: 0.9351831,
                        text: 'る'
                      }
                    ]
                  },
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 175,
                          y: 122
                        },
                        {
                          x: 375,
                          y: 122
                        },
                        {
                          x: 375,
                          y: 213
                        },
                        {
                          x: 175,
                          y: 213
                        }
                      ]
                    },
                    confidence: 0.968332,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 175,
                              y: 122
                            },
                            {
                              x: 255,
                              y: 122
                            },
                            {
                              x: 255,
                              y: 213
                            },
                            {
                              x: 175,
                              y: 213
                            }
                          ]
                        },
                        confidence: 0.96879315,
                        text: 'に'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 240,
                              y: 122
                            },
                            {
                              x: 301,
                              y: 122
                            },
                            {
                              x: 301,
                              y: 213
                            },
                            {
                              x: 240,
                              y: 213
                            }
                          ]
                        },
                        confidence: 0.9470189,
                        text: 'ゃ'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 292,
                              y: 122
                            },
                            {
                              x: 375,
                              y: 122
                            },
                            {
                              x: 375,
                              y: 213
                            },
                            {
                              x: 292,
                              y: 213
                            }
                          ]
                        },
                        confidence: 0.98918396,
                        text: 'ん'
                      }
                    ]
                  },
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 381,
                          y: 122
                        },
                        {
                          x: 410,
                          y: 122
                        },
                        {
                          x: 410,
                          y: 213
                        },
                        {
                          x: 381,
                          y: 213
                        }
                      ]
                    },
                    confidence: 0.965795,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 381,
                              y: 122
                            },
                            {
                              x: 410,
                              y: 122
                            },
                            {
                              x: 410,
                              y: 213
                            },
                            {
                              x: 381,
                              y: 213
                            }
                          ]
                        },
                        confidence: 0.965795,
                        property: {
                          detectedBreak: {
                            type: 'LINE_BREAK'
                          }
                        },
                        text: '!'
                      }
                    ]
                  }
                ]
              },
              {
                boundingBox: {
                  vertices: [
                    {
                      x: 320,
                      y: 244
                    },
                    {
                      x: 420,
                      y: 244
                    },
                    {
                      x: 420,
                      y: 282
                    },
                    {
                      x: 320,
                      y: 282
                    }
                  ]
                },
                confidence: 0.9866878,
                words: [
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 320,
                          y: 244
                        },
                        {
                          x: 399,
                          y: 244
                        },
                        {
                          x: 399,
                          y: 282
                        },
                        {
                          x: 320,
                          y: 282
                        }
                      ]
                    },
                    confidence: 0.9925461,
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 320,
                              y: 244
                            },
                            {
                              x: 358,
                              y: 244
                            },
                            {
                              x: 358,
                              y: 282
                            },
                            {
                              x: 320,
                              y: 282
                            }
                          ]
                        },
                        confidence: 0.98893124,
                        text: 'で'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 361,
                              y: 244
                            },
                            {
                              x: 399,
                              y: 244
                            },
                            {
                              x: 399,
                              y: 282
                            },
                            {
                              x: 361,
                              y: 282
                            }
                          ]
                        },
                        confidence: 0.996161,
                        text: 'す'
                      }
                    ]
                  },
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 402,
                          y: 244
                        },
                        {
                          x: 420,
                          y: 244
                        },
                        {
                          x: 420,
                          y: 282
                        },
                        {
                          x: 402,
                          y: 282
                        }
                      ]
                    },
                    confidence: 0.97497106,
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 402,
                              y: 244
                            },
                            {
                              x: 420,
                              y: 244
                            },
                            {
                              x: 420,
                              y: 282
                            },
                            {
                              x: 402,
                              y: 282
                            }
                          ]
                        },
                        confidence: 0.97497106,
                        property: {
                          detectedBreak: {
                            type: 'LINE_BREAK'
                          }
                        },
                        text: '!'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            blockType: 'TEXT',
            boundingBox: {
              vertices: [
                {
                  x: 129,
                  y: 387
                },
                {
                  x: 266,
                  y: 390
                },
                {
                  x: 263,
                  y: 525
                },
                {
                  x: 126,
                  y: 522
                }
              ]
            },
            confidence: 0.8998492,
            paragraphs: [
              {
                boundingBox: {
                  vertices: [
                    {
                      x: 129,
                      y: 390
                    },
                    {
                      x: 265,
                      y: 390
                    },
                    {
                      x: 265,
                      y: 463
                    },
                    {
                      x: 129,
                      y: 463
                    }
                  ]
                },
                confidence: 0.9067181,
                words: [
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 129,
                          y: 390
                        },
                        {
                          x: 265,
                          y: 390
                        },
                        {
                          x: 265,
                          y: 463
                        },
                        {
                          x: 129,
                          y: 463
                        }
                      ]
                    },
                    confidence: 0.9067181,
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 129,
                              y: 390
                            },
                            {
                              x: 265,
                              y: 390
                            },
                            {
                              x: 265,
                              y: 463
                            },
                            {
                              x: 129,
                              y: 463
                            }
                          ]
                        },
                        confidence: 0.9067181,
                        property: {
                          detectedBreak: {
                            type: 'LINE_BREAK'
                          }
                        },
                        text: 'M'
                      }
                    ]
                  }
                ]
              },
              {
                boundingBox: {
                  vertices: [
                    {
                      x: 131,
                      y: 488
                    },
                    {
                      x: 177,
                      y: 490
                    },
                    {
                      x: 176,
                      y: 523
                    },
                    {
                      x: 130,
                      y: 521
                    }
                  ]
                },
                confidence: 0.89298034,
                words: [
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 131,
                          y: 488
                        },
                        {
                          x: 177,
                          y: 490
                        },
                        {
                          x: 176,
                          y: 523
                        },
                        {
                          x: 130,
                          y: 521
                        }
                      ]
                    },
                    confidence: 0.89298034,
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 131,
                              y: 488
                            },
                            {
                              x: 177,
                              y: 490
                            },
                            {
                              x: 176,
                              y: 523
                            },
                            {
                              x: 130,
                              y: 521
                            }
                          ]
                        },
                        confidence: 0.89298034,
                        property: {
                          detectedBreak: {
                            type: 'LINE_BREAK'
                          }
                        },
                        text: '①'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            blockType: 'TEXT',
            boundingBox: {
              vertices: [
                {
                  x: 601,
                  y: 143
                },
                {
                  x: 589,
                  y: 232
                },
                {
                  x: 450,
                  y: 213
                },
                {
                  x: 462,
                  y: 124
                }
              ]
            },
            confidence: 0.78222555,
            paragraphs: [
              {
                boundingBox: {
                  vertices: [
                    {
                      x: 601,
                      y: 143
                    },
                    {
                      x: 589,
                      y: 232
                    },
                    {
                      x: 450,
                      y: 213
                    },
                    {
                      x: 462,
                      y: 124
                    }
                  ]
                },
                confidence: 0.78222555,
                words: [
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 601,
                          y: 143
                        },
                        {
                          x: 589,
                          y: 232
                        },
                        {
                          x: 450,
                          y: 213
                        },
                        {
                          x: 462,
                          y: 124
                        }
                      ]
                    },
                    confidence: 0.78222555,
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 601,
                              y: 143
                            },
                            {
                              x: 589,
                              y: 232
                            },
                            {
                              x: 450,
                              y: 213
                            },
                            {
                              x: 462,
                              y: 124
                            }
                          ]
                        },
                        confidence: 0.78222555,
                        property: {
                          detectedBreak: {
                            type: 'LINE_BREAK'
                          }
                        },
                        text: '3'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            blockType: 'TEXT',
            boundingBox: {
              vertices: [
                {
                  x: 321,
                  y: 417
                },
                {
                  x: 637,
                  y: 419
                },
                {
                  x: 636,
                  y: 576
                },
                {
                  x: 320,
                  y: 574
                }
              ]
            },
            confidence: 0.96654475,
            paragraphs: [
              {
                boundingBox: {
                  vertices: [
                    {
                      x: 330,
                      y: 417
                    },
                    {
                      x: 451,
                      y: 419
                    },
                    {
                      x: 451,
                      y: 436
                    },
                    {
                      x: 330,
                      y: 434
                    }
                  ]
                },
                confidence: 0.86620003,
                words: [
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 330,
                          y: 418
                        },
                        {
                          x: 340,
                          y: 418
                        },
                        {
                          x: 340,
                          y: 434
                        },
                        {
                          x: 330,
                          y: 434
                        }
                      ]
                    },
                    confidence: 0.4049848,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 330,
                              y: 418
                            },
                            {
                              x: 340,
                              y: 418
                            },
                            {
                              x: 340,
                              y: 434
                            },
                            {
                              x: 330,
                              y: 434
                            }
                          ]
                        },
                        confidence: 0.4049848,
                        property: {
                          detectedBreak: {
                            type: 'SPACE'
                          }
                        },
                        text: '<'
                      }
                    ]
                  },
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 340,
                          y: 417
                        },
                        {
                          x: 444,
                          y: 419
                        },
                        {
                          x: 444,
                          y: 436
                        },
                        {
                          x: 340,
                          y: 434
                        }
                      ]
                    },
                    confidence: 0.98786455,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 340,
                              y: 418
                            },
                            {
                              x: 356,
                              y: 418
                            },
                            {
                              x: 356,
                              y: 434
                            },
                            {
                              x: 340,
                              y: 434
                            }
                          ]
                        },
                        confidence: 0.9809572,
                        text: 'プ'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 358,
                              y: 418
                            },
                            {
                              x: 372,
                              y: 418
                            },
                            {
                              x: 372,
                              y: 434
                            },
                            {
                              x: 358,
                              y: 434
                            }
                          ]
                        },
                        confidence: 0.99201465,
                        text: 'ロ'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 375,
                              y: 418
                            },
                            {
                              x: 389,
                              y: 418
                            },
                            {
                              x: 389,
                              y: 434
                            },
                            {
                              x: 375,
                              y: 434
                            }
                          ]
                        },
                        confidence: 0.9942082,
                        text: 'フ'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 393,
                              y: 418
                            },
                            {
                              x: 406,
                              y: 418
                            },
                            {
                              x: 406,
                              y: 434
                            },
                            {
                              x: 393,
                              y: 434
                            }
                          ]
                        },
                        confidence: 0.99155486,
                        text: 'ィ'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 409,
                              y: 419
                            },
                            {
                              x: 425,
                              y: 419
                            },
                            {
                              x: 425,
                              y: 435
                            },
                            {
                              x: 409,
                              y: 435
                            }
                          ]
                        },
                        confidence: 0.9914155,
                        text: 'ー'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 426,
                              y: 419
                            },
                            {
                              x: 444,
                              y: 419
                            },
                            {
                              x: 444,
                              y: 435
                            },
                            {
                              x: 426,
                              y: 435
                            }
                          ]
                        },
                        confidence: 0.9770369,
                        text: 'ル'
                      }
                    ]
                  },
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 443,
                          y: 419
                        },
                        {
                          x: 451,
                          y: 419
                        },
                        {
                          x: 451,
                          y: 435
                        },
                        {
                          x: 443,
                          y: 435
                        }
                      ]
                    },
                    confidence: 0.59742826,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 443,
                              y: 419
                            },
                            {
                              x: 451,
                              y: 419
                            },
                            {
                              x: 451,
                              y: 435
                            },
                            {
                              x: 443,
                              y: 435
                            }
                          ]
                        },
                        confidence: 0.59742826,
                        property: {
                          detectedBreak: {
                            type: 'LINE_BREAK'
                          }
                        },
                        text: '〉'
                      }
                    ]
                  }
                ]
              },
              {
                boundingBox: {
                  vertices: [
                    {
                      x: 321,
                      y: 459
                    },
                    {
                      x: 636,
                      y: 459
                    },
                    {
                      x: 636,
                      y: 574
                    },
                    {
                      x: 321,
                      y: 574
                    }
                  ]
                },
                confidence: 0.9790878,
                words: [
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 322,
                          y: 459
                        },
                        {
                          x: 337,
                          y: 459
                        },
                        {
                          x: 337,
                          y: 475
                        },
                        {
                          x: 322,
                          y: 475
                        }
                      ]
                    },
                    confidence: 0.98570526,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 322,
                              y: 459
                            },
                            {
                              x: 337,
                              y: 459
                            },
                            {
                              x: 337,
                              y: 475
                            },
                            {
                              x: 322,
                              y: 475
                            }
                          ]
                        },
                        confidence: 0.98570526,
                        text: 'お'
                      }
                    ]
                  },
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 338,
                          y: 459
                        },
                        {
                          x: 372,
                          y: 459
                        },
                        {
                          x: 372,
                          y: 475
                        },
                        {
                          x: 338,
                          y: 475
                        }
                      ]
                    },
                    confidence: 0.99145436,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 338,
                              y: 459
                            },
                            {
                              x: 353,
                              y: 459
                            },
                            {
                              x: 353,
                              y: 475
                            },
                            {
                              x: 338,
                              y: 475
                            }
                          ]
                        },
                        confidence: 0.99151576,
                        text: '散'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 356,
                              y: 459
                            },
                            {
                              x: 372,
                              y: 459
                            },
                            {
                              x: 372,
                              y: 475
                            },
                            {
                              x: 356,
                              y: 475
                            }
                          ]
                        },
                        confidence: 0.991393,
                        text: '歩'
                      }
                    ]
                  },
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 375,
                          y: 459
                        },
                        {
                          x: 390,
                          y: 459
                        },
                        {
                          x: 390,
                          y: 475
                        },
                        {
                          x: 375,
                          y: 475
                        }
                      ]
                    },
                    confidence: 0.99063927,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 375,
                              y: 459
                            },
                            {
                              x: 390,
                              y: 459
                            },
                            {
                              x: 390,
                              y: 475
                            },
                            {
                              x: 375,
                              y: 475
                            }
                          ]
                        },
                        confidence: 0.99063927,
                        text: 'が'
                      }
                    ]
                  },
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 392,
                          y: 459
                        },
                        {
                          x: 423,
                          y: 459
                        },
                        {
                          x: 423,
                          y: 475
                        },
                        {
                          x: 392,
                          y: 475
                        }
                      ]
                    },
                    confidence: 0.9894898,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 392,
                              y: 459
                            },
                            {
                              x: 407,
                              y: 459
                            },
                            {
                              x: 407,
                              y: 475
                            },
                            {
                              x: 392,
                              y: 475
                            }
                          ]
                        },
                        confidence: 0.98677856,
                        text: '毎'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 412,
                              y: 459
                            },
                            {
                              x: 423,
                              y: 459
                            },
                            {
                              x: 423,
                              y: 475
                            },
                            {
                              x: 412,
                              y: 475
                            }
                          ]
                        },
                        confidence: 0.992201,
                        text: '日'
                      }
                    ]
                  },
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 428,
                          y: 459
                        },
                        {
                          x: 497,
                          y: 459
                        },
                        {
                          x: 497,
                          y: 475
                        },
                        {
                          x: 428,
                          y: 475
                        }
                      ]
                    },
                    confidence: 0.9961832,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 428,
                              y: 459
                            },
                            {
                              x: 441,
                              y: 459
                            },
                            {
                              x: 441,
                              y: 475
                            },
                            {
                              x: 428,
                              y: 475
                            }
                          ]
                        },
                        confidence: 0.9951092,
                        text: 'た'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 446,
                              y: 459
                            },
                            {
                              x: 461,
                              y: 459
                            },
                            {
                              x: 461,
                              y: 475
                            },
                            {
                              x: 446,
                              y: 475
                            }
                          ]
                        },
                        confidence: 0.9976853,
                        text: 'の'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 465,
                              y: 459
                            },
                            {
                              x: 478,
                              y: 459
                            },
                            {
                              x: 478,
                              y: 475
                            },
                            {
                              x: 465,
                              y: 475
                            }
                          ]
                        },
                        confidence: 0.9945619,
                        text: 'し'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 481,
                              y: 459
                            },
                            {
                              x: 497,
                              y: 459
                            },
                            {
                              x: 497,
                              y: 475
                            },
                            {
                              x: 481,
                              y: 475
                            }
                          ]
                        },
                        confidence: 0.9973764,
                        text: 'み'
                      }
                    ]
                  },
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 504,
                          y: 459
                        },
                        {
                          x: 506,
                          y: 459
                        },
                        {
                          x: 506,
                          y: 475
                        },
                        {
                          x: 504,
                          y: 475
                        }
                      ]
                    },
                    confidence: 0.9825014,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 504,
                              y: 459
                            },
                            {
                              x: 506,
                              y: 459
                            },
                            {
                              x: 506,
                              y: 475
                            },
                            {
                              x: 504,
                              y: 475
                            }
                          ]
                        },
                        confidence: 0.9825014,
                        property: {
                          detectedBreak: {
                            type: 'EOL_SURE_SPACE'
                          }
                        },
                        text: '!'
                      }
                    ]
                  },
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 321,
                          y: 493
                        },
                        {
                          x: 389,
                          y: 493
                        },
                        {
                          x: 389,
                          y: 508
                        },
                        {
                          x: 321,
                          y: 508
                        }
                      ]
                    },
                    confidence: 0.9948305,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 321,
                              y: 493
                            },
                            {
                              x: 335,
                              y: 493
                            },
                            {
                              x: 335,
                              y: 508
                            },
                            {
                              x: 321,
                              y: 508
                            }
                          ]
                        },
                        confidence: 0.988503,
                        text: 'ス'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 340,
                              y: 493
                            },
                            {
                              x: 353,
                              y: 493
                            },
                            {
                              x: 353,
                              y: 508
                            },
                            {
                              x: 340,
                              y: 508
                            }
                          ]
                        },
                        confidence: 0.99577516,
                        text: 'タ'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 358,
                              y: 493
                            },
                            {
                              x: 373,
                              y: 493
                            },
                            {
                              x: 373,
                              y: 508
                            },
                            {
                              x: 358,
                              y: 508
                            }
                          ]
                        },
                        confidence: 0.9974541,
                        text: 'ジ'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 375,
                              y: 493
                            },
                            {
                              x: 389,
                              y: 493
                            },
                            {
                              x: 389,
                              y: 508
                            },
                            {
                              x: 375,
                              y: 508
                            }
                          ]
                        },
                        confidence: 0.9975898,
                        text: 'オ'
                      }
                    ]
                  },
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 392,
                          y: 493
                        },
                        {
                          x: 408,
                          y: 493
                        },
                        {
                          x: 408,
                          y: 508
                        },
                        {
                          x: 392,
                          y: 508
                        }
                      ]
                    },
                    confidence: 0.9952485,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 392,
                              y: 493
                            },
                            {
                              x: 408,
                              y: 493
                            },
                            {
                              x: 408,
                              y: 508
                            },
                            {
                              x: 392,
                              y: 508
                            }
                          ]
                        },
                        confidence: 0.9952485,
                        text: 'で'
                      }
                    ]
                  },
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 411,
                          y: 493
                        },
                        {
                          x: 476,
                          y: 493
                        },
                        {
                          x: 476,
                          y: 508
                        },
                        {
                          x: 411,
                          y: 508
                        }
                      ]
                    },
                    confidence: 0.90839607,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 411,
                              y: 493
                            },
                            {
                              x: 425,
                              y: 493
                            },
                            {
                              x: 425,
                              y: 508
                            },
                            {
                              x: 411,
                              y: 508
                            }
                          ]
                        },
                        confidence: 0.9819518,
                        text: 'ま'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 428,
                              y: 493
                            },
                            {
                              x: 441,
                              y: 493
                            },
                            {
                              x: 441,
                              y: 508
                            },
                            {
                              x: 428,
                              y: 508
                            }
                          ]
                        },
                        confidence: 0.98954564,
                        text: 'る'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 446,
                              y: 493
                            },
                            {
                              x: 461,
                              y: 493
                            },
                            {
                              x: 461,
                              y: 508
                            },
                            {
                              x: 446,
                              y: 508
                            }
                          ]
                        },
                        confidence: 0.67986274,
                        text: 'ー'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 466,
                              y: 493
                            },
                            {
                              x: 476,
                              y: 493
                            },
                            {
                              x: 476,
                              y: 508
                            },
                            {
                              x: 466,
                              y: 508
                            }
                          ]
                        },
                        confidence: 0.98222417,
                        text: 'く'
                      }
                    ]
                  },
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 481,
                          y: 493
                        },
                        {
                          x: 512,
                          y: 493
                        },
                        {
                          x: 512,
                          y: 508
                        },
                        {
                          x: 481,
                          y: 508
                        }
                      ]
                    },
                    confidence: 0.99593586,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 481,
                              y: 493
                            },
                            {
                              x: 496,
                              y: 493
                            },
                            {
                              x: 496,
                              y: 508
                            },
                            {
                              x: 481,
                              y: 508
                            }
                          ]
                        },
                        confidence: 0.9943037,
                        text: 'な'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 500,
                              y: 493
                            },
                            {
                              x: 512,
                              y: 493
                            },
                            {
                              x: 512,
                              y: 508
                            },
                            {
                              x: 500,
                              y: 508
                            }
                          ]
                        },
                        confidence: 0.997568,
                        text: 'っ'
                      }
                    ]
                  },
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 516,
                          y: 493
                        },
                        {
                          x: 530,
                          y: 493
                        },
                        {
                          x: 530,
                          y: 508
                        },
                        {
                          x: 516,
                          y: 508
                        }
                      ]
                    },
                    confidence: 0.99863666,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 516,
                              y: 493
                            },
                            {
                              x: 530,
                              y: 493
                            },
                            {
                              x: 530,
                              y: 508
                            },
                            {
                              x: 516,
                              y: 508
                            }
                          ]
                        },
                        confidence: 0.99863666,
                        text: 'て'
                      }
                    ]
                  },
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 533,
                          y: 493
                        },
                        {
                          x: 565,
                          y: 493
                        },
                        {
                          x: 565,
                          y: 508
                        },
                        {
                          x: 533,
                          y: 508
                        }
                      ]
                    },
                    confidence: 0.99726945,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 533,
                              y: 493
                            },
                            {
                              x: 549,
                              y: 493
                            },
                            {
                              x: 549,
                              y: 508
                            },
                            {
                              x: 533,
                              y: 508
                            }
                          ]
                        },
                        confidence: 0.99744374,
                        text: '寝'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 552,
                              y: 493
                            },
                            {
                              x: 565,
                              y: 493
                            },
                            {
                              x: 565,
                              y: 508
                            },
                            {
                              x: 552,
                              y: 508
                            }
                          ]
                        },
                        confidence: 0.99709517,
                        text: 'る'
                      }
                    ]
                  },
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 569,
                          y: 493
                        },
                        {
                          x: 584,
                          y: 493
                        },
                        {
                          x: 584,
                          y: 508
                        },
                        {
                          x: 569,
                          y: 508
                        }
                      ]
                    },
                    confidence: 0.99285036,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 569,
                              y: 493
                            },
                            {
                              x: 584,
                              y: 493
                            },
                            {
                              x: 584,
                              y: 508
                            },
                            {
                              x: 569,
                              y: 508
                            }
                          ]
                        },
                        confidence: 0.99285036,
                        text: 'の'
                      }
                    ]
                  },
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 587,
                          y: 493
                        },
                        {
                          x: 602,
                          y: 493
                        },
                        {
                          x: 602,
                          y: 508
                        },
                        {
                          x: 587,
                          y: 508
                        }
                      ]
                    },
                    confidence: 0.9971011,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 587,
                              y: 493
                            },
                            {
                              x: 602,
                              y: 493
                            },
                            {
                              x: 602,
                              y: 508
                            },
                            {
                              x: 587,
                              y: 508
                            }
                          ]
                        },
                        confidence: 0.9971011,
                        text: 'が'
                      }
                    ]
                  },
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 604,
                          y: 493
                        },
                        {
                          x: 636,
                          y: 493
                        },
                        {
                          x: 636,
                          y: 508
                        },
                        {
                          x: 604,
                          y: 508
                        }
                      ]
                    },
                    confidence: 0.9894761,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 604,
                              y: 493
                            },
                            {
                              x: 622,
                              y: 493
                            },
                            {
                              x: 622,
                              y: 508
                            },
                            {
                              x: 604,
                              y: 508
                            }
                          ]
                        },
                        confidence: 0.9940648,
                        text: '好'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 623,
                              y: 493
                            },
                            {
                              x: 636,
                              y: 493
                            },
                            {
                              x: 636,
                              y: 508
                            },
                            {
                              x: 623,
                              y: 508
                            }
                          ]
                        },
                        confidence: 0.98488736,
                        property: {
                          detectedBreak: {
                            type: 'EOL_SURE_SPACE'
                          }
                        },
                        text: 'き'
                      }
                    ]
                  },
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 322,
                          y: 526
                        },
                        {
                          x: 355,
                          y: 526
                        },
                        {
                          x: 355,
                          y: 542
                        },
                        {
                          x: 322,
                          y: 542
                        }
                      ]
                    },
                    confidence: 0.98866594,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 322,
                              y: 526
                            },
                            {
                              x: 335,
                              y: 526
                            },
                            {
                              x: 335,
                              y: 542
                            },
                            {
                              x: 322,
                              y: 542
                            }
                          ]
                        },
                        confidence: 0.98867,
                        text: '口'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 338,
                              y: 526
                            },
                            {
                              x: 355,
                              y: 526
                            },
                            {
                              x: 355,
                              y: 542
                            },
                            {
                              x: 338,
                              y: 542
                            }
                          ]
                        },
                        confidence: 0.9886618,
                        text: '癖'
                      }
                    ]
                  },
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 358,
                          y: 526
                        },
                        {
                          x: 373,
                          y: 526
                        },
                        {
                          x: 373,
                          y: 542
                        },
                        {
                          x: 358,
                          y: 542
                        }
                      ]
                    },
                    confidence: 0.98653156,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 358,
                              y: 526
                            },
                            {
                              x: 373,
                              y: 526
                            },
                            {
                              x: 373,
                              y: 542
                            },
                            {
                              x: 358,
                              y: 542
                            }
                          ]
                        },
                        confidence: 0.98653156,
                        text: 'は'
                      }
                    ]
                  },
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 385,
                          y: 526
                        },
                        {
                          x: 391,
                          y: 526
                        },
                        {
                          x: 391,
                          y: 542
                        },
                        {
                          x: 385,
                          y: 542
                        }
                      ]
                    },
                    confidence: 0.95020944,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 385,
                              y: 526
                            },
                            {
                              x: 391,
                              y: 526
                            },
                            {
                              x: 391,
                              y: 542
                            },
                            {
                              x: 385,
                              y: 542
                            }
                          ]
                        },
                        confidence: 0.95020944,
                        text: '「'
                      }
                    ]
                  },
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 393,
                          y: 526
                        },
                        {
                          x: 442,
                          y: 526
                        },
                        {
                          x: 442,
                          y: 542
                        },
                        {
                          x: 393,
                          y: 542
                        }
                      ]
                    },
                    confidence: 0.9804641,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 393,
                              y: 526
                            },
                            {
                              x: 406,
                              y: 526
                            },
                            {
                              x: 406,
                              y: 542
                            },
                            {
                              x: 393,
                              y: 542
                            }
                          ]
                        },
                        confidence: 0.9728916,
                        text: 'ニ'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 411,
                              y: 526
                            },
                            {
                              x: 423,
                              y: 526
                            },
                            {
                              x: 423,
                              y: 542
                            },
                            {
                              x: 411,
                              y: 542
                            }
                          ]
                        },
                        confidence: 0.9836524,
                        text: 'ャ'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 428,
                              y: 526
                            },
                            {
                              x: 442,
                              y: 526
                            },
                            {
                              x: 442,
                              y: 542
                            },
                            {
                              x: 428,
                              y: 542
                            }
                          ]
                        },
                        confidence: 0.9848482,
                        text: 'ン'
                      }
                    ]
                  },
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 445,
                          y: 526
                        },
                        {
                          x: 462,
                          y: 526
                        },
                        {
                          x: 462,
                          y: 542
                        },
                        {
                          x: 445,
                          y: 542
                        }
                      ]
                    },
                    confidence: 0.9712669,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 445,
                              y: 526
                            },
                            {
                              x: 462,
                              y: 526
                            },
                            {
                              x: 462,
                              y: 542
                            },
                            {
                              x: 445,
                              y: 542
                            }
                          ]
                        },
                        confidence: 0.9712669,
                        text: 'で'
                      }
                    ]
                  },
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 465,
                          y: 526
                        },
                        {
                          x: 473,
                          y: 526
                        },
                        {
                          x: 473,
                          y: 542
                        },
                        {
                          x: 465,
                          y: 542
                        }
                      ]
                    },
                    confidence: 0.9456588,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 465,
                              y: 526
                            },
                            {
                              x: 473,
                              y: 526
                            },
                            {
                              x: 473,
                              y: 542
                            },
                            {
                              x: 465,
                              y: 542
                            }
                          ]
                        },
                        confidence: 0.9456588,
                        text: '?'
                      }
                    ]
                  },
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 479,
                          y: 526
                        },
                        {
                          x: 485,
                          y: 526
                        },
                        {
                          x: 485,
                          y: 542
                        },
                        {
                          x: 479,
                          y: 542
                        }
                      ]
                    },
                    confidence: 0.82433796,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 479,
                              y: 526
                            },
                            {
                              x: 485,
                              y: 526
                            },
                            {
                              x: 485,
                              y: 542
                            },
                            {
                              x: 479,
                              y: 542
                            }
                          ]
                        },
                        confidence: 0.82433796,
                        property: {
                          detectedBreak: {
                            type: 'SPACE'
                          }
                        },
                        text: '」'
                      }
                    ]
                  },
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 508,
                          y: 526
                        },
                        {
                          x: 514,
                          y: 526
                        },
                        {
                          x: 514,
                          y: 542
                        },
                        {
                          x: 508,
                          y: 542
                        }
                      ]
                    },
                    confidence: 0.88962346,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 508,
                              y: 526
                            },
                            {
                              x: 514,
                              y: 526
                            },
                            {
                              x: 514,
                              y: 542
                            },
                            {
                              x: 508,
                              y: 542
                            }
                          ]
                        },
                        confidence: 0.88962346,
                        text: '「'
                      }
                    ]
                  },
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 516,
                          y: 526
                        },
                        {
                          x: 566,
                          y: 526
                        },
                        {
                          x: 566,
                          y: 542
                        },
                        {
                          x: 516,
                          y: 542
                        }
                      ]
                    },
                    confidence: 0.9677778,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 516,
                              y: 526
                            },
                            {
                              x: 530,
                              y: 526
                            },
                            {
                              x: 530,
                              y: 542
                            },
                            {
                              x: 516,
                              y: 542
                            }
                          ]
                        },
                        confidence: 0.92201847,
                        text: 'ニ'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 534,
                              y: 526
                            },
                            {
                              x: 548,
                              y: 526
                            },
                            {
                              x: 548,
                              y: 542
                            },
                            {
                              x: 534,
                              y: 542
                            }
                          ]
                        },
                        confidence: 0.98710924,
                        text: 'ャ'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 551,
                              y: 526
                            },
                            {
                              x: 566,
                              y: 526
                            },
                            {
                              x: 566,
                              y: 542
                            },
                            {
                              x: 551,
                              y: 542
                            }
                          ]
                        },
                        confidence: 0.99420565,
                        text: 'る'
                      }
                    ]
                  },
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 570,
                          y: 526
                        },
                        {
                          x: 602,
                          y: 526
                        },
                        {
                          x: 602,
                          y: 542
                        },
                        {
                          x: 570,
                          y: 542
                        }
                      ]
                    },
                    confidence: 0.9953105,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 570,
                              y: 526
                            },
                            {
                              x: 584,
                              y: 526
                            },
                            {
                              x: 584,
                              y: 542
                            },
                            {
                              x: 570,
                              y: 542
                            }
                          ]
                        },
                        confidence: 0.99705404,
                        text: 'ほ'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 589,
                              y: 526
                            },
                            {
                              x: 602,
                              y: 526
                            },
                            {
                              x: 602,
                              y: 542
                            },
                            {
                              x: 589,
                              y: 542
                            }
                          ]
                        },
                        confidence: 0.99356693,
                        text: 'ど'
                      }
                    ]
                  },
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 610,
                          y: 526
                        },
                        {
                          x: 612,
                          y: 526
                        },
                        {
                          x: 612,
                          y: 542
                        },
                        {
                          x: 610,
                          y: 542
                        }
                      ]
                    },
                    confidence: 0.9952681,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 610,
                              y: 526
                            },
                            {
                              x: 612,
                              y: 526
                            },
                            {
                              x: 612,
                              y: 542
                            },
                            {
                              x: 610,
                              y: 542
                            }
                          ]
                        },
                        confidence: 0.9952681,
                        text: '!'
                      }
                    ]
                  },
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 622,
                          y: 526
                        },
                        {
                          x: 628,
                          y: 526
                        },
                        {
                          x: 628,
                          y: 542
                        },
                        {
                          x: 622,
                          y: 542
                        }
                      ]
                    },
                    confidence: 0.9742229,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 622,
                              y: 526
                            },
                            {
                              x: 628,
                              y: 526
                            },
                            {
                              x: 628,
                              y: 542
                            },
                            {
                              x: 622,
                              y: 542
                            }
                          ]
                        },
                        confidence: 0.9742229,
                        property: {
                          detectedBreak: {
                            type: 'EOL_SURE_SPACE'
                          }
                        },
                        text: '」'
                      }
                    ]
                  },
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 323,
                          y: 560
                        },
                        {
                          x: 369,
                          y: 560
                        },
                        {
                          x: 369,
                          y: 574
                        },
                        {
                          x: 323,
                          y: 574
                        }
                      ]
                    },
                    confidence: 0.9788398,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 323,
                              y: 560
                            },
                            {
                              x: 338,
                              y: 560
                            },
                            {
                              x: 338,
                              y: 574
                            },
                            {
                              x: 323,
                              y: 574
                            }
                          ]
                        },
                        confidence: 0.96680576,
                        text: 'ピ'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 338,
                              y: 560
                            },
                            {
                              x: 354,
                              y: 560
                            },
                            {
                              x: 354,
                              y: 574
                            },
                            {
                              x: 338,
                              y: 574
                            }
                          ]
                        },
                        confidence: 0.9859823,
                        text: 'ー'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 354,
                              y: 560
                            },
                            {
                              x: 369,
                              y: 560
                            },
                            {
                              x: 369,
                              y: 574
                            },
                            {
                              x: 354,
                              y: 574
                            }
                          ]
                        },
                        confidence: 0.98373145,
                        text: 'ン'
                      }
                    ]
                  },
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 373,
                          y: 560
                        },
                        {
                          x: 385,
                          y: 560
                        },
                        {
                          x: 385,
                          y: 574
                        },
                        {
                          x: 373,
                          y: 574
                        }
                      ]
                    },
                    confidence: 0.9889269,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 373,
                              y: 560
                            },
                            {
                              x: 385,
                              y: 560
                            },
                            {
                              x: 385,
                              y: 574
                            },
                            {
                              x: 373,
                              y: 574
                            }
                          ]
                        },
                        confidence: 0.9889269,
                        text: 'と'
                      }
                    ]
                  },
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 389,
                          y: 560
                        },
                        {
                          x: 421,
                          y: 560
                        },
                        {
                          x: 421,
                          y: 574
                        },
                        {
                          x: 389,
                          y: 574
                        }
                      ]
                    },
                    confidence: 0.98662895,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 389,
                              y: 560
                            },
                            {
                              x: 404,
                              y: 560
                            },
                            {
                              x: 404,
                              y: 574
                            },
                            {
                              x: 389,
                              y: 574
                            }
                          ]
                        },
                        confidence: 0.9853244,
                        text: 'た'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 407,
                              y: 560
                            },
                            {
                              x: 421,
                              y: 560
                            },
                            {
                              x: 421,
                              y: 574
                            },
                            {
                              x: 407,
                              y: 574
                            }
                          ]
                        },
                        confidence: 0.9879335,
                        text: 'て'
                      }
                    ]
                  },
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 424,
                          y: 560
                        },
                        {
                          x: 438,
                          y: 560
                        },
                        {
                          x: 438,
                          y: 574
                        },
                        {
                          x: 424,
                          y: 574
                        }
                      ]
                    },
                    confidence: 0.9933093,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 424,
                              y: 560
                            },
                            {
                              x: 438,
                              y: 560
                            },
                            {
                              x: 438,
                              y: 574
                            },
                            {
                              x: 424,
                              y: 574
                            }
                          ]
                        },
                        confidence: 0.9933093,
                        text: 'た'
                      }
                    ]
                  },
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 442,
                          y: 560
                        },
                        {
                          x: 457,
                          y: 560
                        },
                        {
                          x: 457,
                          y: 574
                        },
                        {
                          x: 442,
                          y: 574
                        }
                      ]
                    },
                    confidence: 0.9934493,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 442,
                              y: 560
                            },
                            {
                              x: 457,
                              y: 560
                            },
                            {
                              x: 457,
                              y: 574
                            },
                            {
                              x: 442,
                              y: 574
                            }
                          ]
                        },
                        confidence: 0.9934493,
                        text: '耳'
                      }
                    ]
                  },
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 460,
                          y: 560
                        },
                        {
                          x: 476,
                          y: 560
                        },
                        {
                          x: 476,
                          y: 574
                        },
                        {
                          x: 460,
                          y: 574
                        }
                      ]
                    },
                    confidence: 0.99815834,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 460,
                              y: 560
                            },
                            {
                              x: 476,
                              y: 560
                            },
                            {
                              x: 476,
                              y: 574
                            },
                            {
                              x: 460,
                              y: 574
                            }
                          ]
                        },
                        confidence: 0.99815834,
                        text: 'で'
                      }
                    ]
                  },
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 477,
                          y: 560
                        },
                        {
                          x: 509,
                          y: 560
                        },
                        {
                          x: 509,
                          y: 574
                        },
                        {
                          x: 477,
                          y: 574
                        }
                      ]
                    },
                    confidence: 0.99837077,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 477,
                              y: 560
                            },
                            {
                              x: 490,
                              y: 560
                            },
                            {
                              x: 490,
                              y: 574
                            },
                            {
                              x: 477,
                              y: 574
                            }
                          ]
                        },
                        confidence: 0.9983904,
                        text: '情'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 495,
                              y: 560
                            },
                            {
                              x: 509,
                              y: 560
                            },
                            {
                              x: 509,
                              y: 574
                            },
                            {
                              x: 495,
                              y: 574
                            }
                          ]
                        },
                        confidence: 0.99835116,
                        text: '報'
                      }
                    ]
                  },
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 513,
                          y: 560
                        },
                        {
                          x: 527,
                          y: 560
                        },
                        {
                          x: 527,
                          y: 574
                        },
                        {
                          x: 513,
                          y: 574
                        }
                      ]
                    },
                    confidence: 0.9972847,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 513,
                              y: 560
                            },
                            {
                              x: 527,
                              y: 560
                            },
                            {
                              x: 527,
                              y: 574
                            },
                            {
                              x: 513,
                              y: 574
                            }
                          ]
                        },
                        confidence: 0.9972847,
                        text: 'を'
                      }
                    ]
                  },
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 531,
                          y: 560
                        },
                        {
                          x: 600,
                          y: 560
                        },
                        {
                          x: 600,
                          y: 574
                        },
                        {
                          x: 531,
                          y: 574
                        }
                      ]
                    },
                    confidence: 0.9966821,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 531,
                              y: 560
                            },
                            {
                              x: 545,
                              y: 560
                            },
                            {
                              x: 545,
                              y: 574
                            },
                            {
                              x: 531,
                              y: 574
                            }
                          ]
                        },
                        confidence: 0.9968064,
                        text: 'キ'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 550,
                              y: 560
                            },
                            {
                              x: 561,
                              y: 560
                            },
                            {
                              x: 561,
                              y: 574
                            },
                            {
                              x: 550,
                              y: 574
                            }
                          ]
                        },
                        confidence: 0.99751836,
                        text: 'ャ'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 568,
                              y: 560
                            },
                            {
                              x: 580,
                              y: 560
                            },
                            {
                              x: 580,
                              y: 574
                            },
                            {
                              x: 568,
                              y: 574
                            }
                          ]
                        },
                        confidence: 0.99758273,
                        text: 'ッ'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 584,
                              y: 560
                            },
                            {
                              x: 600,
                              y: 560
                            },
                            {
                              x: 600,
                              y: 574
                            },
                            {
                              x: 584,
                              y: 574
                            }
                          ]
                        },
                        confidence: 0.9948209,
                        text: 'チ'
                      }
                    ]
                  },
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 607,
                          y: 560
                        },
                        {
                          x: 608,
                          y: 560
                        },
                        {
                          x: 608,
                          y: 574
                        },
                        {
                          x: 607,
                          y: 574
                        }
                      ]
                    },
                    confidence: 0.97987646,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 607,
                              y: 560
                            },
                            {
                              x: 608,
                              y: 560
                            },
                            {
                              x: 608,
                              y: 574
                            },
                            {
                              x: 607,
                              y: 574
                            }
                          ]
                        },
                        confidence: 0.97987646,
                        property: {
                          detectedBreak: {
                            type: 'LINE_BREAK'
                          }
                        },
                        text: '!'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            blockType: 'TEXT',
            boundingBox: {
              vertices: [
                {
                  x: 321,
                  y: 594
                },
                {
                  x: 636,
                  y: 594
                },
                {
                  x: 636,
                  y: 642
                },
                {
                  x: 321,
                  y: 642
                }
              ]
            },
            confidence: 0.98709804,
            paragraphs: [
              {
                boundingBox: {
                  vertices: [
                    {
                      x: 321,
                      y: 594
                    },
                    {
                      x: 636,
                      y: 594
                    },
                    {
                      x: 636,
                      y: 609
                    },
                    {
                      x: 321,
                      y: 609
                    }
                  ]
                },
                confidence: 0.9903088,
                words: [
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 321,
                          y: 594
                        },
                        {
                          x: 389,
                          y: 594
                        },
                        {
                          x: 389,
                          y: 609
                        },
                        {
                          x: 321,
                          y: 609
                        }
                      ]
                    },
                    confidence: 0.9943299,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 321,
                              y: 594
                            },
                            {
                              x: 336,
                              y: 594
                            },
                            {
                              x: 336,
                              y: 609
                            },
                            {
                              x: 321,
                              y: 609
                            }
                          ]
                        },
                        confidence: 0.9892574,
                        text: 'チ'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 340,
                              y: 594
                            },
                            {
                              x: 352,
                              y: 594
                            },
                            {
                              x: 352,
                              y: 609
                            },
                            {
                              x: 340,
                              y: 609
                            }
                          ]
                        },
                        confidence: 0.99629724,
                        text: 'ャ'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 357,
                              y: 594
                            },
                            {
                              x: 372,
                              y: 594
                            },
                            {
                              x: 372,
                              y: 609
                            },
                            {
                              x: 357,
                              y: 609
                            }
                          ]
                        },
                        confidence: 0.9946018,
                        text: 'ー'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 374,
                              y: 594
                            },
                            {
                              x: 389,
                              y: 594
                            },
                            {
                              x: 389,
                              y: 609
                            },
                            {
                              x: 374,
                              y: 609
                            }
                          ]
                        },
                        confidence: 0.9971633,
                        text: 'ム'
                      }
                    ]
                  },
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 391,
                          y: 594
                        },
                        {
                          x: 457,
                          y: 594
                        },
                        {
                          x: 457,
                          y: 609
                        },
                        {
                          x: 391,
                          y: 609
                        }
                      ]
                    },
                    confidence: 0.9931407,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 391,
                              y: 594
                            },
                            {
                              x: 408,
                              y: 594
                            },
                            {
                              x: 408,
                              y: 609
                            },
                            {
                              x: 391,
                              y: 609
                            }
                          ]
                        },
                        confidence: 0.99554604,
                        text: 'ポ'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 408,
                              y: 594
                            },
                            {
                              x: 423,
                              y: 594
                            },
                            {
                              x: 423,
                              y: 609
                            },
                            {
                              x: 408,
                              y: 609
                            }
                          ]
                        },
                        confidence: 0.99514914,
                        text: 'イ'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 427,
                              y: 594
                            },
                            {
                              x: 442,
                              y: 594
                            },
                            {
                              x: 442,
                              y: 609
                            },
                            {
                              x: 427,
                              y: 609
                            }
                          ]
                        },
                        confidence: 0.99020493,
                        text: 'ン'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 448,
                              y: 594
                            },
                            {
                              x: 457,
                              y: 594
                            },
                            {
                              x: 457,
                              y: 609
                            },
                            {
                              x: 448,
                              y: 609
                            }
                          ]
                        },
                        confidence: 0.9916627,
                        text: 'ト'
                      }
                    ]
                  },
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 463,
                          y: 594
                        },
                        {
                          x: 478,
                          y: 594
                        },
                        {
                          x: 478,
                          y: 609
                        },
                        {
                          x: 463,
                          y: 609
                        }
                      ]
                    },
                    confidence: 0.9920838,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 463,
                              y: 594
                            },
                            {
                              x: 478,
                              y: 594
                            },
                            {
                              x: 478,
                              y: 609
                            },
                            {
                              x: 463,
                              y: 609
                            }
                          ]
                        },
                        confidence: 0.9920838,
                        text: 'は'
                      }
                    ]
                  },
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 480,
                          y: 594
                        },
                        {
                          x: 548,
                          y: 594
                        },
                        {
                          x: 548,
                          y: 609
                        },
                        {
                          x: 480,
                          y: 609
                        }
                      ]
                    },
                    confidence: 0.9946771,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 480,
                              y: 594
                            },
                            {
                              x: 493,
                              y: 594
                            },
                            {
                              x: 493,
                              y: 609
                            },
                            {
                              x: 480,
                              y: 609
                            }
                          ]
                        },
                        confidence: 0.9884847,
                        text: 'カ'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 498,
                              y: 594
                            },
                            {
                              x: 512,
                              y: 594
                            },
                            {
                              x: 512,
                              y: 609
                            },
                            {
                              x: 498,
                              y: 609
                            }
                          ]
                        },
                        confidence: 0.9956062,
                        text: 'ラ'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 516,
                              y: 594
                            },
                            {
                              x: 529,
                              y: 594
                            },
                            {
                              x: 529,
                              y: 609
                            },
                            {
                              x: 516,
                              y: 609
                            }
                          ]
                        },
                        confidence: 0.99681616,
                        text: 'フ'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 531,
                              y: 594
                            },
                            {
                              x: 548,
                              y: 594
                            },
                            {
                              x: 548,
                              y: 609
                            },
                            {
                              x: 531,
                              y: 609
                            }
                          ]
                        },
                        confidence: 0.9978015,
                        text: 'ル'
                      }
                    ]
                  },
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 549,
                          y: 594
                        },
                        {
                          x: 564,
                          y: 594
                        },
                        {
                          x: 564,
                          y: 609
                        },
                        {
                          x: 549,
                          y: 609
                        }
                      ]
                    },
                    confidence: 0.9946466,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 549,
                              y: 594
                            },
                            {
                              x: 564,
                              y: 594
                            },
                            {
                              x: 564,
                              y: 609
                            },
                            {
                              x: 549,
                              y: 609
                            }
                          ]
                        },
                        confidence: 0.9946466,
                        text: 'な'
                      }
                    ]
                  },
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 569,
                          y: 594
                        },
                        {
                          x: 620,
                          y: 594
                        },
                        {
                          x: 620,
                          y: 609
                        },
                        {
                          x: 569,
                          y: 609
                        }
                      ]
                    },
                    confidence: 0.98682123,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 569,
                              y: 594
                            },
                            {
                              x: 580,
                              y: 594
                            },
                            {
                              x: 580,
                              y: 609
                            },
                            {
                              x: 569,
                              y: 609
                            }
                          ]
                        },
                        confidence: 0.99310714,
                        text: 'し'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 586,
                              y: 594
                            },
                            {
                              x: 597,
                              y: 594
                            },
                            {
                              x: 597,
                              y: 609
                            },
                            {
                              x: 586,
                              y: 609
                            }
                          ]
                        },
                        confidence: 0.9884247,
                        text: 'っ'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 603,
                              y: 594
                            },
                            {
                              x: 620,
                              y: 594
                            },
                            {
                              x: 620,
                              y: 609
                            },
                            {
                              x: 603,
                              y: 609
                            }
                          ]
                        },
                        confidence: 0.97893184,
                        text: 'ぽ'
                      }
                    ]
                  },
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 620,
                          y: 594
                        },
                        {
                          x: 636,
                          y: 594
                        },
                        {
                          x: 636,
                          y: 609
                        },
                        {
                          x: 620,
                          y: 609
                        }
                      ]
                    },
                    confidence: 0.9497735,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 620,
                              y: 594
                            },
                            {
                              x: 636,
                              y: 594
                            },
                            {
                              x: 636,
                              y: 609
                            },
                            {
                              x: 620,
                              y: 609
                            }
                          ]
                        },
                        confidence: 0.9497735,
                        property: {
                          detectedBreak: {
                            type: 'LINE_BREAK'
                          }
                        },
                        text: '♡'
                      }
                    ]
                  }
                ]
              },
              {
                boundingBox: {
                  vertices: [
                    {
                      x: 322,
                      y: 627
                    },
                    {
                      x: 579,
                      y: 627
                    },
                    {
                      x: 579,
                      y: 642
                    },
                    {
                      x: 322,
                      y: 642
                    }
                  ]
                },
                confidence: 0.98324513,
                words: [
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 322,
                          y: 627
                        },
                        {
                          x: 353,
                          y: 627
                        },
                        {
                          x: 353,
                          y: 642
                        },
                        {
                          x: 322,
                          y: 642
                        }
                      ]
                    },
                    confidence: 0.98664916,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 322,
                              y: 627
                            },
                            {
                              x: 334,
                              y: 627
                            },
                            {
                              x: 334,
                              y: 642
                            },
                            {
                              x: 322,
                              y: 642
                            }
                          ]
                        },
                        confidence: 0.9820812,
                        text: '自'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 339,
                              y: 627
                            },
                            {
                              x: 353,
                              y: 627
                            },
                            {
                              x: 353,
                              y: 642
                            },
                            {
                              x: 339,
                              y: 642
                            }
                          ]
                        },
                        confidence: 0.9912172,
                        text: '由'
                      }
                    ]
                  },
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 356,
                          y: 627
                        },
                        {
                          x: 405,
                          y: 627
                        },
                        {
                          x: 405,
                          y: 642
                        },
                        {
                          x: 356,
                          y: 642
                        }
                      ]
                    },
                    confidence: 0.99383605,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 356,
                              y: 627
                            },
                            {
                              x: 372,
                              y: 627
                            },
                            {
                              x: 372,
                              y: 642
                            },
                            {
                              x: 356,
                              y: 642
                            }
                          ]
                        },
                        confidence: 0.99330765,
                        text: '気'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 376,
                              y: 627
                            },
                            {
                              x: 388,
                              y: 627
                            },
                            {
                              x: 388,
                              y: 642
                            },
                            {
                              x: 376,
                              y: 642
                            }
                          ]
                        },
                        confidence: 0.99524736,
                        text: 'ま'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 393,
                              y: 627
                            },
                            {
                              x: 405,
                              y: 627
                            },
                            {
                              x: 405,
                              y: 642
                            },
                            {
                              x: 393,
                              y: 642
                            }
                          ]
                        },
                        confidence: 0.99295306,
                        text: 'ま'
                      }
                    ]
                  },
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 410,
                          y: 627
                        },
                        {
                          x: 424,
                          y: 627
                        },
                        {
                          x: 424,
                          y: 642
                        },
                        {
                          x: 410,
                          y: 642
                        }
                      ]
                    },
                    confidence: 0.9925485,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 410,
                              y: 627
                            },
                            {
                              x: 424,
                              y: 627
                            },
                            {
                              x: 424,
                              y: 642
                            },
                            {
                              x: 410,
                              y: 642
                            }
                          ]
                        },
                        confidence: 0.9925485,
                        text: 'で'
                      }
                    ]
                  },
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 428,
                          y: 627
                        },
                        {
                          x: 509,
                          y: 627
                        },
                        {
                          x: 509,
                          y: 642
                        },
                        {
                          x: 428,
                          y: 642
                        }
                      ]
                    },
                    confidence: 0.984742,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 428,
                              y: 627
                            },
                            {
                              x: 442,
                              y: 627
                            },
                            {
                              x: 442,
                              y: 642
                            },
                            {
                              x: 428,
                              y: 642
                            }
                          ]
                        },
                        confidence: 0.98595876,
                        text: 'マ'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 444,
                              y: 627
                            },
                            {
                              x: 458,
                              y: 627
                            },
                            {
                              x: 458,
                              y: 642
                            },
                            {
                              x: 444,
                              y: 642
                            }
                          ]
                        },
                        confidence: 0.9916542,
                        text: 'イ'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 459,
                              y: 627
                            },
                            {
                              x: 476,
                              y: 627
                            },
                            {
                              x: 476,
                              y: 642
                            },
                            {
                              x: 459,
                              y: 642
                            }
                          ]
                        },
                        confidence: 0.9849426,
                        text: 'ペ'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 478,
                              y: 627
                            },
                            {
                              x: 493,
                              y: 627
                            },
                            {
                              x: 493,
                              y: 642
                            },
                            {
                              x: 478,
                              y: 642
                            }
                          ]
                        },
                        confidence: 0.9851882,
                        text: 'ー'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 493,
                              y: 627
                            },
                            {
                              x: 509,
                              y: 627
                            },
                            {
                              x: 509,
                              y: 642
                            },
                            {
                              x: 493,
                              y: 642
                            }
                          ]
                        },
                        confidence: 0.97596604,
                        text: 'ス'
                      }
                    ]
                  },
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 511,
                          y: 627
                        },
                        {
                          x: 526,
                          y: 627
                        },
                        {
                          x: 526,
                          y: 642
                        },
                        {
                          x: 511,
                          y: 642
                        }
                      ]
                    },
                    confidence: 0.9811458,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 511,
                              y: 627
                            },
                            {
                              x: 526,
                              y: 627
                            },
                            {
                              x: 526,
                              y: 642
                            },
                            {
                              x: 511,
                              y: 642
                            }
                          ]
                        },
                        confidence: 0.9811458,
                        text: 'な'
                      }
                    ]
                  },
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 528,
                          y: 627
                        },
                        {
                          x: 562,
                          y: 627
                        },
                        {
                          x: 562,
                          y: 642
                        },
                        {
                          x: 528,
                          y: 642
                        }
                      ]
                    },
                    confidence: 0.97786045,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 528,
                              y: 627
                            },
                            {
                              x: 544,
                              y: 627
                            },
                            {
                              x: 544,
                              y: 642
                            },
                            {
                              x: 528,
                              y: 642
                            }
                          ]
                        },
                        confidence: 0.97882414,
                        text: '正'
                      },
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 546,
                              y: 627
                            },
                            {
                              x: 562,
                              y: 627
                            },
                            {
                              x: 562,
                              y: 642
                            },
                            {
                              x: 546,
                              y: 642
                            }
                          ]
                        },
                        confidence: 0.9768967,
                        text: '直'
                      }
                    ]
                  },
                  {
                    boundingBox: {
                      vertices: [
                        {
                          x: 563,
                          y: 627
                        },
                        {
                          x: 579,
                          y: 627
                        },
                        {
                          x: 579,
                          y: 642
                        },
                        {
                          x: 563,
                          y: 642
                        }
                      ]
                    },
                    confidence: 0.94074535,
                    property: {
                      detectedLanguages: [
                        {
                          confidence: 1,
                          languageCode: 'ja'
                        }
                      ]
                    },
                    symbols: [
                      {
                        boundingBox: {
                          vertices: [
                            {
                              x: 563,
                              y: 627
                            },
                            {
                              x: 579,
                              y: 627
                            },
                            {
                              x: 579,
                              y: 642
                            },
                            {
                              x: 563,
                              y: 642
                            }
                          ]
                        },
                        confidence: 0.94074535,
                        property: {
                          detectedBreak: {
                            type: 'LINE_BREAK'
                          }
                        },
                        text: '者'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ],
        confidence: 0.9218033,
        height: 679,
        property: {
          detectedLanguages: [
            {
              confidence: 0.9531822,
              languageCode: 'ja'
            }
          ]
        },
        width: 700
      }
    ],
    text: 'こんにちは\nまるにゃん!\nです!\nM\n①\n3\n< プロフィール〉\nお散歩が毎日たのしみ!\nスタジオでまるーくなって寝るのが好き\n口癖は「ニャンで?」 「ニャるほど!」\nピーンとたてた耳で情報をキャッチ!\nチャームポイントはカラフルなしっぽ♡\n自由気ままでマイペースな正直者'
  }
}

function main (originalJson) {
  const paragraphs = []
  const page = originalJson.fullTextAnnotation.pages[0]
  for (const block of page.blocks) {
    for (const paragraph of block.paragraphs) {
      const text = paragraph.words.map(word => word.symbols.map(symbol => symbol.text).join('')).join('')
      const vertices = paragraph.boundingBox.vertices
      const leftTop = { x: vertices[0].x, y: vertices[0].y }
      const rightTop = { x: vertices[1].x, y: vertices[1].y }
      const rightBottom = { x: vertices[2].x, y: vertices[2].y }
      const leftBottom = { x: vertices[3].x, y: vertices[3].y }
      paragraphs.push({ text, leftTop, rightTop, rightBottom, leftBottom })
    }
  }
  return paragraphs
}

export const marunyanParagraphs = main(originalJson)
