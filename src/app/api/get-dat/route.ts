import { exec } from 'child_process';

export async function POST(req: Request): Promise<Response> {
    try {
        const body = await req.json();
        const command: string | undefined = body.command;

        if (!command) {
            return new Response(
                JSON.stringify({ error: 'Command not provided' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        return new Promise(resolve => {
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    resolve(
                        new Response(
                            JSON.stringify({ error: stderr || error.message }),
                            {
                                status: 500,
                                headers: { 'Content-Type': 'application/json' },
                            }
                        )
                    );
                } else {
                    resolve(
                        new Response(JSON.stringify({ output: stdout }), {
                            status: 200,
                            headers: { 'Content-Type': 'application/json' },
                        })
                    );
                }
            });
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: (error as Error).message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
