import { useMutation } from '@tanstack/react-query';

interface RunCommandResponse {
    output?: string;
    error?: string;
}

interface RunCommandVariables {
    command: string;
}

export default = () => {
    return useMutation<RunCommandResponse, Error, RunCommandVariables>(
        async ({ command }) => {
            const response = await fetch('/api/run-command', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ command }),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(
                    errorResponse.error || 'Unknown error occurred'
                );
            }

            return response.json();
        }
    );
};
