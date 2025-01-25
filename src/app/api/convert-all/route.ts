// import { exec } from 'child_process';

// export async function GET(req: Request): Promise<Response> {
//     try {
//         // const body = await req.json();
//         // const { target: string, folder: string, datLocation: string } = body;

//         // if (!command) {
//         //     return new Response(
//         //         JSON.stringify({ error: 'Command not provided' }),
//         //         { status: 400, headers: { 'Content-Type': 'application/json' } }
//         //     );
//         // }

//         //get all .dat
//         //get all .dc6
//         //create temp base on .dat and .dc6

//         const datFiles = (
//             (await new Promise(resolve => {
//                 exec(
//                     `find /home/deck/Documents/github/mxl-builder/public -type f -name "*.dat"`,
//                     (err, stdout, stderr) => {
//                         resolve(stdout);
//                     }
//                 );
//             })) as string
//         )
//             .trim()
//             .split('\n');

//         const dc6Files = (
//             (await new Promise(resolve => {
//                 exec(
//                     `find /home/deck/Documents/github/mxl-builder/public -type f -name "*.dc6"`,
//                     (err, stdout, stderr) => {
//                         resolve(stdout);
//                     }
//                 );
//             })) as string
//         )
//             .trim()
//             .split('\n');

//         for (const dcFile of dc6Files) {
//             for (const palette of datFiles) {
//                 const name = palette.replace('/pal.dat', '').split('/');
//                 const realName = `images/${dcFile.split('.')[0]}/${name[name.length - 1]}`;
//                 await new Promise(resolve => {
//                     exec(
//                         `mkdir -p ${realName}; dc6png -f "${dcFile}" -o "${realName}" -p "${palette}"`,
//                         (error, stdout, stderr) => {
//                             if (error) {
//                                 resolve(
//                                     new Response(
//                                         JSON.stringify({
//                                             error: stderr || error.message,
//                                         }),
//                                         {
//                                             status: 500,
//                                             headers: {
//                                                 'Content-Type':
//                                                     'application/json',
//                                             },
//                                         }
//                                     )
//                                 );
//                             } else {
//                                 resolve(
//                                     new Response(
//                                         JSON.stringify({ output: stdout }),
//                                         {
//                                             status: 200,
//                                             headers: {
//                                                 'Content-Type':
//                                                     'application/json',
//                                             },
//                                         }
//                                     )
//                                 );
//                             }
//                         }
//                     );
//                 });
//             }
//         }

//         return new Response(JSON.stringify({ datFiles, dc6Files }, null, '\t'));

//         // return new Promise(resolve => {
//         //     exec(
//         //         `dc6png -f "./public/mxl/icons-ass.dc6" -o "public/mxl/assassinIcons" -p "/home/deck/Documents/github/mxl-builder/public/palette/Units/pal.dat"`,
//         //         (error, stdout, stderr) => {
//         //             if (error) {
//         //                 resolve(
//         //                     new Response(
//         //                         JSON.stringify({
//         //                             error: stderr || error.message,
//         //                         }),
//         //                         {
//         //                             status: 500,
//         //                             headers: {
//         //                                 'Content-Type': 'application/json',
//         //                             },
//         //                         }
//         //                     )
//         //                 );
//         //             } else {
//         //                 resolve(
//         //                     new Response(JSON.stringify({ output: stdout }), {
//         //                         status: 200,
//         //                         headers: { 'Content-Type': 'application/json' },
//         //                     })
//         //                 );
//         //             }
//         //         }
//         //     );
//         // });
//     } catch (error) {
//         return new Response(
//             JSON.stringify({ error: (error as Error).message }),
//             { status: 500, headers: { 'Content-Type': 'application/json' } }
//         );
//     }
// }
