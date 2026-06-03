// About ScreenDollars page type definitions

export interface SEOData {
    title?: string;
    description?: string;
    keywords?: string;
    [key: string]: any;
}

export interface SocialLink {
    url: string;
    title: string;
}

export interface Testimonial {
    testimonial_content: string;
    name: string;
    designation: string;
    company_name: string;
    person_image?: {
        url: string;
        [key: string]: any;
    };
    company_logo?: {
        url: string;
        [key: string]: any;
    };
}

export interface TransformedCountData {
    title: string;
    value: number;
    suffix: string;
    prefix: string;
    separator: string;
}

export interface TeamMember {
    title: string;
    designation: string;
    image: {
        url: string;
        [key: string]: any;
    };
    linkedin_link?: SocialLink;
    twitter_link?: SocialLink;
    email_id?: string;
}

export interface AboutData {
    page_title: string;
    content: string;
    banner_img?: string;
    our_story?: {
        title: string;
        story_content: string;
        image?: {
            url: string;
            [key: string]: any;
        };
    };
    testimonial_title: string;
    testimonial: Testimonial[];
    glance?: {
        title: string;
        data: Array<{
            title: string;
            count: string;
            [key: string]: any;
        }>;
    };
    team_members: {
        title: string;
        content: string;
        team_member_data: TeamMember[];
    };
    [key: string]: any;
}

export interface AboutUSProps {
    SEOdata: SEOData;
    AboutData: AboutData;
}
