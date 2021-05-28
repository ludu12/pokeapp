const colors = {
    "black": [0, 0, 0],
    "blue": [0, 0, 255],
    "brown": [165, 42, 42],
    "gray": [128, 128, 128],
    "green": [0, 255, 0],
    "pink": [255, 192, 203],
    "purple": [128, 0, 128],
    "red": [255, 0, 0],
    "white": [255, 255, 255],
    "yellow": [255, 255, 0]
}

export const colorToRGBA = (color, opacity) => {
    return `rgba(${colors[color].join(',')}, ${opacity})`
}
