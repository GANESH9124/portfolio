export interface Project {
    id: number;
    title: string;
    description: string;
    images: string[];
    link: string;
    tags: string;
    views: number;
    created_at: string;
}

export interface Blog {
    id: number;
    title: string;
    description: string;
    content: string;
    images: string[];
    tags: string;
    views: number;
    created_at: string;
}
