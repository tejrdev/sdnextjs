import { RiTwitterXFill } from 'react-icons/ri';
function SocialMedia({ classes }) {
    const social_options = [
        { title: 'Facebook', href: 'https://www.facebook.com/Screendollars-112268833968674/?modal=admin_todo_tour', class: 'fab fa-facebook-f' },
        { title: 'Twitter', href: 'https://twitter.com/screendollars', class: 'fab fa-twitter' },
        { title: 'Instagram', href: 'https://www.instagram.com/screendollars/', class: 'fab fa-instagram' },
        { title: 'Youtube', href: 'https://www.youtube.com/c/Screendollars', class: 'fab fa-youtube' },
        { title: 'Tiktok', href: 'https://www.tiktok.com/@screendollars', class: 'fab fa-tiktok' },
    ];
    const social_class = 'social-links ' + classes;
    return (
        <>
            <ul className={social_class}>

                {social_options.map((item, id) => {
                    return (
                        <li key={id}>
                            <a
                                href={item.href}
                                target="_blank"
                                title={item.title}
                                rel="noreferrer"
                            >
                                {item.title == "Twitter" ?
                                    <RiTwitterXFill />
                                    :
                                    <i
                                        className={item.class}
                                        aria-hidden="true"
                                        rel="noreferrer"
                                    ></i>
                                }
                            </a>
                        </li>

                    )
                })}
            </ul>
        </>
    )
}

export default SocialMedia