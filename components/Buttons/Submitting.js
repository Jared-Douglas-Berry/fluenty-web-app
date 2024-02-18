'use client';

import { useFormStatus } from 'react-dom';

export default function Submitting({bntText}) {
    const { pending } = useFormStatus();
    return (
        <button disabled={pending}>
            {pending ? 'Submitting...' : bntText}
        </button>
    );
}
