const fs = require('fs');

const steps = [1, 2, 4, 6, 8, 12, 16, 32, 48, 64]

let outp = "";

steps.forEach((step) => {
    outp += `.w-${step}{width:${step * .5}rem;}.h-${step}{height:${step * .5}rem;}`
})

steps.forEach((step) => {
    outp += `.grid-${step},`
})

outp = `${outp.slice(0, outp.length - 1)}{--ld-gap:.5rem;display:grid;gap:var(--ld-gap);}`

steps.forEach((step) => {
    outp += `.grid-${step}{grid-template-columns:repeat(${step},1fr)}`;
})

steps.forEach((step) => {
    outp += `.span-${step}{grid-column: span ${step}}`;
})

let colorsRaw = fs.readFileSync('_colors.scss').toString();
colorsRaw = colorsRaw.slice(8, colorsRaw.length - 2).split('\n');

colorsRaw.forEach((color) => {
    if (color.length <= 4) {return;}
    color = color.slice(9, color.length - 1).split(": ");
    outp += `.fg-${color[0]}{--ld-text:${color[1]}}.bg-${color[0]}{--ld-background:${color[1]}}`
    outp += `.hover\\:fg-${color[0]}:hover{--ld-text:${color[1]}}.hover\\:bg-${color[0]}:hover{--ld-background:${color[1]}}`
})


fs.writeFileSync('components/_general.scss', outp);