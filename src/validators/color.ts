import logger from '../logger'

const colors = [
  { name: 'Pink', hex: '#FFC0CB', rgb: 'RGB(255, 192, 203)' },
  { name: 'LightPink', hex: '#FFB6C1', rgb: 'RGB(255, 182, 193)' },
  { name: 'HotPink', hex: '#FF69B4', rgb: 'RGB(255, 105, 180)' },
  { name: 'DeepPink', hex: '#FF1493', rgb: 'RGB(255, 20, 147)' },
  { name: 'PaleVioletRed', hex: '#DB7093', rgb: 'RGB(219, 112, 147)' },
  { name: 'MediumVioletRed', hex: '#C71585', rgb: 'RGB(199, 21, 133)' },
  { name: 'Lavender', hex: '#E6E6FA', rgb: 'RGB(230, 230, 250)' },
  { name: 'Thistle', hex: '#D8BFD8', rgb: 'RGB(216, 191, 216)' },
  { name: 'Plum', hex: '#DDA0DD', rgb: 'RGB(221, 160, 221)' },
  { name: 'Orchid', hex: '#DA70D6', rgb: 'RGB(218, 112, 214)' },
  { name: 'Violet', hex: '#EE82EE', rgb: 'RGB(238, 130, 238)' },
  { name: 'Fuchsia', hex: '#FF00FF', rgb: 'RGB(255, 0, 255)' },
  { name: 'Magenta', hex: '#FF00FF', rgb: 'RGB(255, 0, 255)' },
  { name: 'MediumOrchid', hex: '#BA55D3', rgb: 'RGB(186, 85, 211)' },
  { name: 'DarkOrchid', hex: '#9932CC', rgb: 'RGB(153, 50, 204)' },
  { name: 'DarkViolet', hex: '#9400D3', rgb: 'RGB(148, 0, 211)' },
  { name: 'BlueViolet', hex: '#8A2BE2', rgb: 'RGB(138, 43, 226)' },
  { name: 'DarkMagenta', hex: '#8B008B', rgb: 'RGB(139, 0, 139)' },
  { name: 'Purple', hex: '#800080', rgb: 'RGB(128, 0, 128)' },
  { name: 'MediumPurple', hex: '#9370DB', rgb: 'RGB(147, 112, 219)' },
  { name: 'MediumSlateBlue', hex: '#7B68EE', rgb: 'RGB(123, 104, 238)' },
  { name: 'SlateBlue', hex: '#6A5ACD', rgb: 'RGB(106, 90, 205)' },
  { name: 'DarkSlateBlue', hex: '#483D8B', rgb: 'RGB(72, 61, 139)' },
  { name: 'RebeccaPurple', hex: '#663399', rgb: 'RGB(102, 51, 153)' },
  { name: 'Indigo', hex: '#4B0082', rgb: 'RGB(75, 0, 130)' },
  { name: 'LightSalmon', hex: '#FFA07A', rgb: 'RGB(255, 160, 122)' },
  { name: 'Salmon', hex: '#FA8072', rgb: 'RGB(250, 128, 114)' },
  { name: 'DarkSalmon', hex: '#E9967A', rgb: 'RGB(233, 150, 122)' },
  { name: 'LightCoral', hex: '#F08080', rgb: 'RGB(240, 128, 128)' },
  { name: 'IndianRed', hex: '#CD5C5C', rgb: 'RGB(205, 92, 92)' },
  { name: 'Crimson', hex: '#DC143C', rgb: 'RGB(220, 20, 60)' },
  { name: 'Red', hex: '#FF0000', rgb: 'RGB(255, 0, 0)' },
  { name: 'FireBrick', hex: '#B22222', rgb: 'RGB(178, 34, 34)' },
  { name: 'DarkRed', hex: '#8B0000', rgb: 'RGB(139, 0, 0)' },
  { name: 'Orange', hex: '#FFA500', rgb: 'RGB(255, 165, 0)' },
  { name: 'DarkOrange', hex: '#FF8C00', rgb: 'RGB(255, 140, 0)' },
  { name: 'Coral', hex: '#FF7F50', rgb: 'RGB(255, 127, 80)' },
  { name: 'Tomato', hex: '#FF6347', rgb: 'RGB(255, 99, 71)' },
  { name: 'OrangeRed', hex: '#FF4500', rgb: 'RGB(255, 69, 0)' },
  { name: 'Gold', hex: '#FFD700', rgb: 'RGB(255, 215, 0)' },
  { name: 'Yellow', hex: '#FFFF00', rgb: 'RGB(255, 255, 0)' },
  { name: 'LightYellow', hex: '#FFFFE0', rgb: 'RGB(255, 255, 224)' },
  { name: 'LemonChiffon', hex: '#FFFACD', rgb: 'RGB(255, 250, 205)' },
  { name: 'LightGoldenRodYellow', hex: '#FAFAD2', rgb: 'RGB(250, 250, 210)' },
  { name: 'PapayaWhip', hex: '#FFEFD5', rgb: 'RGB(255, 239, 213)' },
  { name: 'Moccasin', hex: '#FFE4B5', rgb: 'RGB(255, 228, 181)' },
  { name: 'PeachPuff', hex: '#FFDAB9', rgb: 'RGB(255, 218, 185)' },
  { name: 'PaleGoldenRod', hex: '#EEE8AA', rgb: 'RGB(238, 232, 170)' },
  { name: 'Khaki', hex: '#F0E68C', rgb: 'RGB(240, 230, 140)' },
  { name: 'DarkKhaki', hex: '#BDB76B', rgb: 'RGB(189, 183, 107)' },
  { name: 'GreenYellow', hex: '#ADFF2F', rgb: 'RGB(173, 255, 47)' },
  { name: 'Chartreuse', hex: '#7FFF00', rgb: 'RGB(127, 255, 0)' },
  { name: 'LawnGreen', hex: '#7CFC00', rgb: 'RGB(124, 252, 0)' },
  { name: 'Lime', hex: '#00FF00', rgb: 'RGB(0, 255, 0)' },
  { name: 'LimeGreen', hex: '#32CD32', rgb: 'RGB(50, 205, 50)' },
  { name: 'PaleGreen', hex: '#98FB98', rgb: 'RGB(152, 251, 152)' },
  { name: 'LightGreen', hex: '#90EE90', rgb: 'RGB(144, 238, 144)' },
  { name: 'MediumSpringGreen', hex: '#00FA9A', rgb: 'RGB(0, 250, 154)' },
  { name: 'SpringGreen', hex: '#00FF7F', rgb: 'RGB(0, 255, 127)' },
  { name: 'MediumSeaGreen', hex: '#3CB371', rgb: 'RGB(60, 179, 113)' },
  { name: 'SeaGreen', hex: '#2E8B57', rgb: 'RGB(46, 139, 87)' },
  { name: 'ForestGreen', hex: '#228B22', rgb: 'RGB(34, 139, 34)' },
  { name: 'Green', hex: '#008000', rgb: 'RGB(0, 128, 0)' },
  { name: 'DarkGreen', hex: '#006400', rgb: 'RGB(0, 100, 0)' },
  { name: 'YellowGreen', hex: '#9ACD32', rgb: 'RGB(154, 205, 50)' },
  { name: 'OliveDrab', hex: '#6B8E23', rgb: 'RGB(107, 142, 35)' },
  { name: 'DarkOliveGreen', hex: '#556B2F', rgb: 'RGB(85, 107, 47)' },
  { name: 'MediumAquaMarine', hex: '#66CDAA', rgb: 'RGB(102, 205, 170)' },
  { name: 'DarkSeaGreen', hex: '#8FBC8F', rgb: 'RGB(143, 188, 143)' },
  { name: 'LightSeaGreen', hex: '#20B2AA', rgb: 'RGB(32, 178, 170)' },
  { name: 'DarkCyan', hex: '#008B8B', rgb: 'RGB(0, 139, 139)' },
  { name: 'Teal', hex: '#008080', rgb: 'RGB(0, 128, 128)' },
  { name: 'Aqua', hex: '#00FFFF', rgb: 'RGB(0, 255, 255)' },
  { name: 'Cyan', hex: '#00FFFF', rgb: 'RGB(0, 255, 255)' },
  { name: 'LightCyan', hex: '#E0FFFF', rgb: 'RGB(224, 255, 255)' },
  { name: 'PaleTurquoise', hex: '#AFEEEE', rgb: 'RGB(175, 238, 238)' },
  { name: 'Aquamarine', hex: '#7FFFD4', rgb: 'RGB(127, 255, 212)' },
  { name: 'Turquoise', hex: '#40E0D0', rgb: 'RGB(64, 224, 208)' },
  { name: 'MediumTurquoise', hex: '#48D1CC', rgb: 'RGB(72, 209, 204)' },
  { name: 'DarkTurquoise', hex: '#00CED1', rgb: 'RGB(0, 206, 209)' },
  { name: 'CadetBlue', hex: '#5F9EA0', rgb: 'RGB(95, 158, 160)' },
  { name: 'SteelBlue', hex: '#4682B4', rgb: 'RGB(70, 130, 180)' },
  { name: 'LightSteelBlue', hex: '#B0C4DE', rgb: 'RGB(176, 196, 222)' },
  { name: 'LightBlue', hex: '#ADD8E6', rgb: 'RGB(173, 216, 230)' },
  { name: 'PowderBlue', hex: '#B0E0E6', rgb: 'RGB(176, 224, 230)' },
  { name: 'LightSkyBlue', hex: '#87CEFA', rgb: 'RGB(135, 206, 250)' },
  { name: 'SkyBlue', hex: '#87CEEB', rgb: 'RGB(135, 206, 235)' },
  { name: 'CornflowerBlue', hex: '#6495ED', rgb: 'RGB(100, 149, 237)' },
  { name: 'DeepSkyBlue', hex: '#00BFFF', rgb: 'RGB(0, 191, 255)' },
  { name: 'DodgerBlue', hex: '#1E90FF', rgb: 'RGB(30, 144, 255)' },
  { name: 'RoyalBlue', hex: '#4169E1', rgb: 'RGB(65, 105, 225)' },
  { name: 'Blue', hex: '#0000FF', rgb: 'RGB(0, 0, 255)' },
  { name: 'MediumBlue', hex: '#0000CD', rgb: 'RGB(0, 0, 205)' },
  { name: 'DarkBlue', hex: '#00008B', rgb: 'RGB(0, 0, 139)' },
  { name: 'Navy', hex: '#000080', rgb: 'RGB(0, 0, 128)' },
  { name: 'MidnightBlue', hex: '#191970', rgb: 'RGB(25, 25, 112)' },
  { name: 'Cornsilk', hex: '#FFF8DC', rgb: 'RGB(255, 248, 220)' },
  { name: 'BlanchedAlmond', hex: '#FFEBCD', rgb: 'RGB(255, 235, 205)' },
  { name: 'Bisque', hex: '#FFE4C4', rgb: 'RGB(255, 228, 196)' },
  { name: 'NavajoWhite', hex: '#FFDEAD', rgb: 'RGB(255, 222, 173)' },
  { name: 'Wheat', hex: '#F5DEB3', rgb: 'RGB(245, 222, 179)' },
  { name: 'BurlyWood', hex: '#DEB887', rgb: 'RGB(222, 184, 135)' },
  { name: 'Tan', hex: '#D2B48C', rgb: 'RGB(210, 180, 140)' },
  { name: 'RosyBrown', hex: '#BC8F8F', rgb: 'RGB(188, 143, 143)' },
  { name: 'SandyBrown', hex: '#F4A460', rgb: 'RGB(244, 164, 96)' },
  { name: 'GoldenRod', hex: '#DAA520', rgb: 'RGB(218, 165, 32)' },
  { name: 'DarkGoldenRod', hex: '#B8860B', rgb: 'RGB(184, 134, 11)' },
  { name: 'Peru', hex: '#CD853F', rgb: 'RGB(205, 133, 63)' },
  { name: 'Chocolate', hex: '#D2691E', rgb: 'RGB(210, 105, 30)' },
  { name: 'Olive', hex: '#808000', rgb: 'RGB(128, 128, 0)' },
  { name: 'SaddleBrown', hex: '#8B4513', rgb: 'RGB(139, 69, 19)' },
  { name: 'Sienna', hex: '#A0522D', rgb: 'RGB(160, 82, 45)' },
  { name: 'Brown', hex: '#A52A2A', rgb: 'RGB(165, 42, 42)' },
  { name: 'Maroon', hex: '#800000', rgb: 'RGB(128, 0, 0)' },
  { name: 'White', hex: '#FFFFFF', rgb: 'RGB(255, 255, 255)' },
  { name: 'Snow', hex: '#FFFAFA', rgb: 'RGB(255, 250, 250)' },
  { name: 'HoneyDew', hex: '#F0FFF0', rgb: 'RGB(240, 255, 240)' },
  { name: 'MintCream', hex: '#F5FFFA', rgb: 'RGB(245, 255, 250)' },
  { name: 'Azure', hex: '#F0FFFF', rgb: 'RGB(240, 255, 255)' },
  { name: 'AliceBlue', hex: '#F0F8FF', rgb: 'RGB(240, 248, 255)' },
  { name: 'GhostWhite', hex: '#F8F8FF', rgb: 'RGB(248, 248, 255)' },
  { name: 'WhiteSmoke', hex: '#F5F5F5', rgb: 'RGB(245, 245, 245)' },
  { name: 'SeaShell', hex: '#FFF5EE', rgb: 'RGB(255, 245, 238)' },
  { name: 'Beige', hex: '#F5F5DC', rgb: 'RGB(245, 245, 220)' },
  { name: 'OldLace', hex: '#FDF5E6', rgb: 'RGB(253, 245, 230)' },
  { name: 'FloralWhite', hex: '#FFFAF0', rgb: 'RGB(255, 250, 240)' },
  { name: 'Ivory', hex: '#FFFFF0', rgb: 'RGB(255, 255, 240)' },
  { name: 'AntiqueWhite', hex: '#FAEBD7', rgb: 'RGB(250, 235, 215)' },
  { name: 'Linen', hex: '#FAF0E6', rgb: 'RGB(250, 240, 230)' },
  { name: 'LavenderBlush', hex: '#FFF0F5', rgb: 'RGB(255, 240, 245)' },
  { name: 'MistyRose', hex: '#FFE4E1', rgb: 'RGB(255, 228, 225)' },
  { name: 'Gainsboro', hex: '#DCDCDC', rgb: 'RGB(220, 220, 220)' },
  { name: 'LightGray', hex: '#D3D3D3', rgb: 'RGB(211, 211, 211)' },
  { name: 'Silver', hex: '#C0C0C0', rgb: 'RGB(192, 192, 192)' },
  { name: 'DarkGray', hex: '#A9A9A9', rgb: 'RGB(169, 169, 169)' },
  { name: 'DimGray', hex: '#696969', rgb: 'RGB(105, 105, 105)' },
  { name: 'Gray', hex: '#808080', rgb: 'RGB(128, 128, 128)' },
  { name: 'LightSlateGray', hex: '#778899', rgb: 'RGB(119, 136, 153)' },
  { name: 'SlateGray', hex: '#708090', rgb: 'RGB(112, 128, 144)' },
  { name: 'DarkSlateGray', hex: '#2F4F4F', rgb: 'RGB(47, 79, 79)' },
  { name: 'Black', hex: '#000000', rgb: 'RGB(0, 0, 0)' }
]

const validColor = (color: string) => {
  try {
    return colors.find(c => c.name === color || c.hex === color) ? true : false
  } catch (error) {
    if (process.env.DEBUG) logger.debug(error)
    return false
  }
}

export default validColor