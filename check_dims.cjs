const fs = require('fs');

const files = [
    'public/living-infrastructure-board-full.png',
    'public/prismatic-infill-board-full.png',
    'public/trinity-bathhouse-board-full.png',
    'public/the-last-kitchen-board-full.png'
];

files.forEach(file => {
    if (fs.existsSync(file)) {
        const buffer = fs.readFileSync(file);
        
        // PNG magic number check
        if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47) {
            const width = buffer.readUInt32BE(16);
            const height = buffer.readUInt32BE(20);
            const sizeMB = (buffer.length / (1024 * 1024)).toFixed(2);
            console.log(`${file}: ${width}x${height} pixels, ${sizeMB} MB`);
        } else {
            console.log(`${file}: Not a valid PNG`);
        }
    } else {
        console.log(`${file}: File not found`);
    }
});
