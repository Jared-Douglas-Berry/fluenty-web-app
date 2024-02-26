export default async function SigninUser() {
    const response = await fetch('/api/auth/signin');

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong.')
    }

    return data;
}