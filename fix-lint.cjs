const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            // Very simple check: if "motion" is imported but never used (except in the import itself)
            // A quick and dirty fix for the lint error since we know the context from the lint output
            const motionImportRegex = /import\s+\{\s*motion\s*\}\s+from\s+['"]framer-motion['"];?\r?\n/g;
            // Check if 'motion' is used anywhere else in the file: `<motion` or `motion.`
            if (!content.includes('<motion') && !content.includes('motion.')) {
                if (motionImportRegex.test(content)) {
                    content = content.replace(motionImportRegex, '');
                    fs.writeFileSync(fullPath, content, 'utf8');
                    console.log('Fixed', fullPath);
                }
            }
        }
    }
}

// Additional manual fixes for specific files that might have motion imported but not used 
processDir(path.join(__dirname, 'src', 'components'));
processDir(path.join(__dirname, 'src', 'sections'));
