import useBearer from "./useBearer";

// fetch all projects from backend
export default async () => {
    const res = await fetch('/api/projects', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${await useBearer()}`
        }
    });
    if (res.status === 200) {
        const data = await res.json();
        return data;
    }
    else {
        return false;
    }
}