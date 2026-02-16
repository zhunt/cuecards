import fs from 'node:fs';
import path from 'node:path';
import { Plugin } from 'vite';

export default function cardServerPlugin(): Plugin {
    return {
        name: 'vite-plugin-card-server',
        configureServer(server) {
            server.middlewares.use('/api/cards', (req, res, next) => {
                const dbPath = path.resolve(process.cwd(), 'cards.json');

                if (req.method === 'GET') {
                    if (fs.existsSync(dbPath)) {
                        const data = fs.readFileSync(dbPath, 'utf-8');
                        res.setHeader('Content-Type', 'application/json');
                        res.end(data);
                    } else {
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ cards: [], categories: [] }));
                    }
                } else if (req.method === 'POST') {
                    let body = '';
                    req.on('data', (chunk) => {
                        body += chunk.toString();
                    });
                    req.on('end', () => {
                        try {
                            // Validate JSON
                            JSON.parse(body);
                            fs.writeFileSync(dbPath, body);
                            res.setHeader('Content-Type', 'application/json');
                            res.end(JSON.stringify({ success: true }));
                        } catch (e) {
                            res.statusCode = 400;
                            res.end(JSON.stringify({ error: 'Invalid JSON' }));
                        }
                    });
                } else {
                    next();
                }
            });
        },
    };
}
