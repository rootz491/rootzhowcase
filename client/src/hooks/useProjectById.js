import useBearer from "./useBearer";

// fetch specific project's info
export default async projectId => {
    const res = await fetch(`/api/projects/${projectId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${await useBearer()}`
        }
    })
    if (res.status === 200) {
        const data = await res.json();
        return data;
    }
    else {
        return null;
    }
}