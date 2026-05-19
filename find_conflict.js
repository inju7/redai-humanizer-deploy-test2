const fs = require('fs');
const content = fs.readFileSync('src/app/App.tsx', 'utf-8');
const lines = content.split('\n');

const conflictMarkers = [];
const appDeclarations = [];

lines.forEach((line, i) => {
  if (line.includes('<<<<<<<') || line.includes('=======') || line.includes('>>>>>>>')) {
    conflictMarkers.push({ line: i + 1, content: line.trim() });
  }
  if (line.includes('export default function App') || line.includes('function WorkspaceProcessor')) {
    appDeclarations.push({ line: i + 1, content: line.trim() });
  }
});

console.log('Conflict Markers:', conflictMarkers);
console.log('Declarations:', appDeclarations);
