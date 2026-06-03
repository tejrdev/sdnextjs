const currentYear = new Date().getFullYear();
const currentQuarter = Math.ceil(new Date().getMonth() / 3);

export const JSONData = {
    logo: "https://www.api.screendollars.com/wp-content/uploads/2022/06/SD-LOGO-1.png",
    favicon: "https://www.api.screendollars.com/wp-content/uploads/2021/06/apple-touch-icon.png",
    copyright_text: "© %d Screendollars, all rights reserved, <a href=\"https://www.api.screendollars.com/wp-content/themes/screendollars/assets/doc/Terms-of-use-agreement-Screendollars.pdf\" target=\"_blank\">Terms of Use </a> and <a href=\"https://www.api.screendollars.com/wp-content/themes/screendollars/assets/doc/Privacy-Screendollars.pdf\" target=\"_blank\">Privacy Policy </a>apply <i>This site is protected by reCAPTCHA, Google's  <a href=\"https://policies.google.com/terms\" target=\"_blank\">Terms of Service</a> and <a href=\"https://policies.google.com/privacy\" target=\"_blank\">Privacy Policy</a> apply </i>",
    social_links: [
        {
            social_media_title: "Facebook",
            icon_class: "fab fa-facebook-f",
            social_media_link: "https://www.facebook.com/Screendollars-112268833968674/?modal=admin_todo_tour"
        },
        {
            social_media_title: "Twitter",
            icon_class: "fab fa-twitter",
            social_media_link: "https://twitter.com/screendollars"
        },
        {
            social_media_title: "Instagram",
            icon_class: "fab fa-instagram",
            social_media_link: "https://www.instagram.com/screendollars/"
        },
        {
            social_media_title: "Youtube",
            icon_class: "fab fa-youtube",
            social_media_link: "https://www.youtube.com/c/Screendollars"
        }
    ],
    page_content_404_page: '<h1>Oops Page Not Found</h1>\n<p>We can&#8217;t seem to find the page you are looking for. Try going back to the home page or <a href="https://www.screendollars.com/contact-us/">contact us</a> for more information.</p>\n',
    poster_img_h: "https://www.api.screendollars.com/wp-content/themes/screendollars-live/assets/images/p_noimgico.png",
    poster_img_v: "https://www.api.screendollars.com/wp-content/themes/screendollars-live/assets/images/noimgico.jpg",
    talent_img: "https://www.api.screendollars.com/wp-content/themes/screendollars-live/assets/images/noactor.svg",
    playicon: "https://www.api.screendollars.com/wp-content/themes/screendollars-live/assets/images/playicov2.png",
    drive_in: "https://www.api.screendollars.com/wp-content/themes/screendollars-live/assets/images/drive-in-icon.png",
    home_newsletter: {
        title: "Newsletter Signup",
        content: "Join over 300,000 professionals in receiving the <strong>Screendollars Newsletter</strong>, the top-rated report on the film industry.  Emailed every Sunday."
    },
    USStates: ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VT", "WA", "WI", "WV", "WY"],
    CANStates: ["AB", "BC", "MB", "NB", "NF", "NL", "NS", "NT", "NU", "ON", "PE", "QC", "SK", "YT"],
    FilterStates: [
        { key: "AK", value: "alaska", metaTitle: "Alaska Movie Theaters | Find Cinemas & Showtimes in Alaska ", metaDescription: "Browse movie theaters across Alaska. Find showtimes, locations, and book tickets at cinemas near you — from Anchorage to Fairbanks." },
        { key: "AL", value: "alabama", metaTitle: "Alabama Movie Theaters | Find Cinemas & Showtimes in Alabama ", metaDescription: "Browse movie theaters across Alabama. Find showtimes, locations, and book tickets at cinemas near you — from Birmingham to Mobile." },
        { key: "AR", value: "arkansas", metaTitle: "Arkansas Movie Theaters | Find Cinemas & Showtimes in Arkansas ", metaDescription: "Browse movie theaters across Arkansas. Find showtimes, locations, and book tickets at cinemas near you — from Little Rock to Fayetteville." },
        { key: "AZ", value: "arizona", metaTitle: "Arizona Movie Theaters | Find Cinemas & Showtimes in Arizona ", metaDescription: "Browse movie theaters across Arizona. Find showtimes, locations, and book tickets at cinemas near you — from Phoenix to Tucson." },
        { key: "CA", value: "california", metaTitle: "California Movie Theaters | Find Cinemas & Showtimes in California ", metaDescription: "Browse movie theaters across California. Find showtimes, locations, and book tickets at cinemas near you — from Los Angeles to San Francisco." },
        { key: "CO", value: "colorado", metaTitle: "Colorado Movie Theaters | Find Cinemas & Showtimes in Colorado ", metaDescription: "Browse movie theaters across Colorado. Find showtimes, locations, and book tickets at cinemas near you — from Denver to Colorado Springs." },
        { key: "CT", value: "connecticut", metaTitle: "Connecticut Movie Theaters | Find Cinemas & Showtimes in Connecticut ", metaDescription: "Browse movie theaters across Connecticut. Find showtimes, locations, and book tickets at cinemas near you — from Hartford to New Haven." },
        { key: "DC", value: "district-of-columbia", metaTitle: "District of Columbia Movie Theaters | Find Cinemas & Showtimes in District of Columbia ", metaDescription: "Browse movie theaters across District of Columbia. Find showtimes, locations, and book tickets at cinemas near you — from Washington DC to Georgetown." },
        { key: "DE", value: "delaware", metaTitle: "Delaware Movie Theaters | Find Cinemas & Showtimes in Delaware ", metaDescription: "Browse movie theaters across Delaware. Find showtimes, locations, and book tickets at cinemas near you — from Wilmington to Dover." },
        { key: "FL", value: "florida", metaTitle: "Florida Movie Theaters | Find Cinemas & Showtimes in Florida ", metaDescription: "Browse movie theaters across Florida. Find showtimes, locations, and book tickets at cinemas near you — from Miami to Orlando." },
        { key: "GA", value: "georgia", metaTitle: "Georgia Movie Theaters | Find Cinemas & Showtimes in Georgia ", metaDescription: "Browse movie theaters across Georgia. Find showtimes, locations, and book tickets at cinemas near you — from Atlanta to Savannah." },
        { key: "HI", value: "hawaii", metaTitle: "Hawaii Movie Theaters | Find Cinemas & Showtimes in Hawaii ", metaDescription: "Browse movie theaters across Hawaii. Find showtimes, locations, and book tickets at cinemas near you — from Honolulu to Maui." },
        { key: "IA", value: "iowa", metaTitle: "Iowa Movie Theaters | Find Cinemas & Showtimes in Iowa ", metaDescription: "Browse movie theaters across Iowa. Find showtimes, locations, and book tickets at cinemas near you — from Des Moines to Cedar Rapids." },
        { key: "ID", value: "idaho", metaTitle: "Idaho Movie Theaters | Find Cinemas & Showtimes in Idaho ", metaDescription: "Browse movie theaters across Idaho. Find showtimes, locations, and book tickets at cinemas near you — from Boise to Meridian." },
        { key: "IL", value: "illinois", metaTitle: "Illinois Movie Theaters | Find Cinemas & Showtimes in Illinois ", metaDescription: "Browse movie theaters across Illinois. Find showtimes, locations, and book tickets at cinemas near you — from Chicago to Springfield." },
        { key: "IN", value: "indiana", metaTitle: "Indiana Movie Theaters | Find Cinemas & Showtimes in Indiana ", metaDescription: "Browse movie theaters across Indiana. Find showtimes, locations, and book tickets at cinemas near you — from Indianapolis to Fort Wayne." },
        { key: "KS", value: "kansas", metaTitle: "Kansas Movie Theaters | Find Cinemas & Showtimes in Kansas ", metaDescription: "Browse movie theaters across Kansas. Find showtimes, locations, and book tickets at cinemas near you — from Wichita to Overland Park." },
        { key: "KY", value: "kentucky", metaTitle: "Kentucky Movie Theaters | Find Cinemas & Showtimes in Kentucky ", metaDescription: "Browse movie theaters across Kentucky. Find showtimes, locations, and book tickets at cinemas near you — from Louisville to Lexington." },
        { key: "LA", value: "louisiana", metaTitle: "Louisiana Movie Theaters | Find Cinemas & Showtimes in Louisiana ", metaDescription: "Browse movie theaters across Louisiana. Find showtimes, locations, and book tickets at cinemas near you — from New Orleans to Baton Rouge." },
        { key: "MA", value: "massachusetts", metaTitle: "Massachusetts Movie Theaters | Find Cinemas & Showtimes in Massachusetts ", metaDescription: "Browse movie theaters across Massachusetts. Find showtimes, locations, and book tickets at cinemas near you — from Boston to Worcester." },
        { key: "MD", value: "maryland", metaTitle: "Maryland Movie Theaters | Find Cinemas & Showtimes in Maryland ", metaDescription: "Browse movie theaters across Maryland. Find showtimes, locations, and book tickets at cinemas near you — from Baltimore to Annapolis." },
        { key: "ME", value: "maine", metaTitle: "Maine Movie Theaters | Find Cinemas & Showtimes in Maine ", metaDescription: "Browse movie theaters across Maine. Find showtimes, locations, and book tickets at cinemas near you — from Portland to Augusta." },
        { key: "MI", value: "michigan", metaTitle: "Michigan Movie Theaters | Find Cinemas & Showtimes in Michigan ", metaDescription: "Browse movie theaters across Michigan. Find showtimes, locations, and book tickets at cinemas near you — from Detroit to Grand Rapids." },
        { key: "MN", value: "minnesota", metaTitle: "Minnesota Movie Theaters | Find Cinemas & Showtimes in Minnesota ", metaDescription: "Browse movie theaters across Minnesota. Find showtimes, locations, and book tickets at cinemas near you — from Minneapolis to Saint Paul." },
        { key: "MO", value: "missouri", metaTitle: "Missouri Movie Theaters | Find Cinemas & Showtimes in Missouri ", metaDescription: "Browse movie theaters across Missouri. Find showtimes, locations, and book tickets at cinemas near you — from Kansas City to St. Louis." },
        { key: "MS", value: "mississippi", metaTitle: "Mississippi Movie Theaters | Find Cinemas & Showtimes in Mississippi ", metaDescription: "Browse movie theaters across Mississippi. Find showtimes, locations, and book tickets at cinemas near you — from Jackson to Gulfport." },
        { key: "MT", value: "montana", metaTitle: "Montana Movie Theaters | Find Cinemas & Showtimes in Montana ", metaDescription: "Browse movie theaters across Montana. Find showtimes, locations, and book tickets at cinemas near you — from Billings to Missoula." },
        { key: "NC", value: "north-carolina", metaTitle: "North Carolina Movie Theaters | Find Cinemas & Showtimes in North Carolina ", metaDescription: "Browse movie theaters across North Carolina. Find showtimes, locations, and book tickets at cinemas near you — from Charlotte to Raleigh." },
        { key: "ND", value: "north-dakota", metaTitle: "North Dakota Movie Theaters | Find Cinemas & Showtimes in North Dakota ", metaDescription: "Browse movie theaters across North Dakota. Find showtimes, locations, and book tickets at cinemas near you — from Fargo to Bismarck." },
        { key: "NE", value: "nebraska", metaTitle: "Nebraska Movie Theaters | Find Cinemas & Showtimes in Nebraska ", metaDescription: "Browse movie theaters across Nebraska. Find showtimes, locations, and book tickets at cinemas near you — from Omaha to Lincoln." },
        { key: "NH", value: "new-hampshire", metaTitle: "New Hampshire Movie Theaters | Find Cinemas & Showtimes in New Hampshire ", metaDescription: "Browse movie theaters across New Hampshire. Find showtimes, locations, and book tickets at cinemas near you — from Manchester to Concord." },
        { key: "NJ", value: "new-jersey", metaTitle: "New Jersey Movie Theaters | Find Cinemas & Showtimes in New Jersey ", metaDescription: "Browse movie theaters across New Jersey. Find showtimes, locations, and book tickets at cinemas near you — from Newark to Jersey City." },
        { key: "NM", value: "new-mexico", metaTitle: "New Mexico Movie Theaters | Find Cinemas & Showtimes in New Mexico ", metaDescription: "Browse movie theaters across New Mexico. Find showtimes, locations, and book tickets at cinemas near you — from Albuquerque to Santa Fe." },
        { key: "NV", value: "nevada", metaTitle: "Nevada Movie Theaters | Find Cinemas & Showtimes in Nevada ", metaDescription: "Browse movie theaters across Nevada. Find showtimes, locations, and book tickets at cinemas near you — from Las Vegas to Reno." },
        { key: "NY", value: "new-york", metaTitle: "New York Movie Theaters | Find Cinemas & Showtimes in New York ", metaDescription: "Browse movie theaters across New York. Find showtimes, locations, and book tickets at cinemas near you — from New York City to Buffalo." },
        { key: "OH", value: "ohio", metaTitle: "Ohio Movie Theaters | Find Cinemas & Showtimes in Ohio ", metaDescription: "Browse movie theaters across Ohio. Find showtimes, locations, and book tickets at cinemas near you — from Columbus to Cleveland." },
        { key: "OK", value: "oklahoma", metaTitle: "Oklahoma Movie Theaters | Find Cinemas & Showtimes in Oklahoma ", metaDescription: "Browse movie theaters across Oklahoma. Find showtimes, locations, and book tickets at cinemas near you — from Oklahoma City to Tulsa." },
        { key: "OR", value: "oregon", metaTitle: "Oregon Movie Theaters | Find Cinemas & Showtimes in Oregon ", metaDescription: "Browse movie theaters across Oregon. Find showtimes, locations, and book tickets at cinemas near you — from Portland to Eugene." },
        { key: "PA", value: "pennsylvania", metaTitle: "Pennsylvania Movie Theaters | Find Cinemas & Showtimes in Pennsylvania ", metaDescription: "Browse movie theaters across Pennsylvania. Find showtimes, locations, and book tickets at cinemas near you — from Philadelphia to Pittsburgh." },
        { key: "RI", value: "rhode-island", metaTitle: "Rhode Island Movie Theaters | Find Cinemas & Showtimes in Rhode Island ", metaDescription: "Browse movie theaters across Rhode Island. Find showtimes, locations, and book tickets at cinemas near you — from Providence to Warwick." },
        { key: "SC", value: "south-carolina", metaTitle: "South Carolina Movie Theaters | Find Cinemas & Showtimes in South Carolina ", metaDescription: "Browse movie theaters across South Carolina. Find showtimes, locations, and book tickets at cinemas near you — from Charleston to Columbia." },
        { key: "SD", value: "south-dakota", metaTitle: "South Dakota Movie Theaters | Find Cinemas & Showtimes in South Dakota ", metaDescription: "Browse movie theaters across South Dakota. Find showtimes, locations, and book tickets at cinemas near you — from Sioux Falls to Rapid City." },
        { key: "TN", value: "tennessee", metaTitle: "Tennessee Movie Theaters | Find Cinemas & Showtimes in Tennessee ", metaDescription: "Browse movie theaters across Tennessee. Find showtimes, locations, and book tickets at cinemas near you — from Nashville to Memphis." },
        { key: "TX", value: "texas", metaTitle: "Texas Movie Theaters | Find Cinemas & Showtimes in Texas ", metaDescription: "Browse movie theaters across Texas. Find showtimes, locations, and book tickets at cinemas near you — from Houston to Dallas." },
        { key: "UT", value: "utah", metaTitle: "Utah Movie Theaters | Find Cinemas & Showtimes in Utah ", metaDescription: "Browse movie theaters across Utah. Find showtimes, locations, and book tickets at cinemas near you — from Salt Lake City to Provo." },
        { key: "VA", value: "virginia", metaTitle: "Virginia Movie Theaters | Find Cinemas & Showtimes in Virginia ", metaDescription: "Browse movie theaters across Virginia. Find showtimes, locations, and book tickets at cinemas near you — from Virginia Beach to Richmond." },
        { key: "VT", value: "vermont", metaTitle: "Vermont Movie Theaters | Find Cinemas & Showtimes in Vermont ", metaDescription: "Browse movie theaters across Vermont. Find showtimes, locations, and book tickets at cinemas near you — from Burlington to Montpelier." },
        { key: "WA", value: "washington", metaTitle: "Washington Movie Theaters | Find Cinemas & Showtimes in Washington ", metaDescription: "Browse movie theaters across Washington. Find showtimes, locations, and book tickets at cinemas near you — from Seattle to Spokane." },
        { key: "WI", value: "wisconsin", metaTitle: "Wisconsin Movie Theaters | Find Cinemas & Showtimes in Wisconsin ", metaDescription: "Browse movie theaters across Wisconsin. Find showtimes, locations, and book tickets at cinemas near you — from Milwaukee to Madison." },
        { key: "WV", value: "west-virginia", metaTitle: "West Virginia Movie Theaters | Find Cinemas & Showtimes in West Virginia ", metaDescription: "Browse movie theaters across West Virginia. Find showtimes, locations, and book tickets at cinemas near you — from Charleston to Huntington." },
        { key: "WY", value: "wyoming", metaTitle: "Wyoming Movie Theaters | Find Cinemas & Showtimes in Wyoming ", metaDescription: "Browse movie theaters across Wyoming. Find showtimes, locations, and book tickets at cinemas near you — from Cheyenne to Casper." },
        { key: "AB", value: "alberta", metaTitle: "Alberta Movie Theaters | Find Cinemas & Showtimes in Alberta ", metaDescription: "Browse movie theaters across Alberta. Find showtimes, locations, and book tickets at cinemas near you — from Calgary to Edmonton." },
        { key: "BC", value: "british-columbia", metaTitle: "British Columbia Movie Theaters | Find Cinemas & Showtimes in British Columbia ", metaDescription: "Browse movie theaters across British Columbia. Find showtimes, locations, and book tickets at cinemas near you — from Vancouver to Victoria." },
        { key: "MB", value: "manitoba", metaTitle: "Manitoba Movie Theaters | Find Cinemas & Showtimes in Manitoba ", metaDescription: "Browse movie theaters across Manitoba. Find showtimes, locations, and book tickets at cinemas near you — from Winnipeg to Brandon." },
        { key: "NB", value: "new-brunswick", metaTitle: "New Brunswick Movie Theaters | Find Cinemas & Showtimes in New Brunswick ", metaDescription: "Browse movie theaters across New Brunswick. Find showtimes, locations, and book tickets at cinemas near you — from Moncton to Fredericton." },
        { key: "NF", value: "newfoundland", metaTitle: "Newfoundland Movie Theaters | Find Cinemas & Showtimes in Newfoundland ", metaDescription: "Browse movie theaters across Newfoundland. Find showtimes, locations, and book tickets at cinemas near you — from St. John's to Corner Brook." },
        { key: "NL", value: "newfoundland-and-labrador", metaTitle: "Newfoundland and Labrador Movie Theaters | Find Cinemas & Showtimes in Newfoundland and Labrador ", metaDescription: "Browse movie theaters across Newfoundland and Labrador. Find showtimes, locations, and book tickets at cinemas near you — from St. John's to Labrador City." },
        { key: "NS", value: "nova-scotia", metaTitle: "Nova Scotia Movie Theaters | Find Cinemas & Showtimes in Nova Scotia ", metaDescription: "Browse movie theaters across Nova Scotia. Find showtimes, locations, and book tickets at cinemas near you — from Halifax to Sydney." },
        { key: "NT", value: "northwest-territories", metaTitle: "Northwest Territories Movie Theaters | Find Cinemas & Showtimes in Northwest Territories ", metaDescription: "Browse movie theaters across Northwest Territories. Find showtimes, locations, and book tickets at cinemas near you — from Yellowknife to Hay River." },
        { key: "NU", value: "nunavut", metaTitle: "Nunavut Movie Theaters | Find Cinemas & Showtimes in Nunavut ", metaDescription: "Browse movie theaters across Nunavut. Find showtimes, locations, and book tickets at cinemas near you — from Iqaluit to Rankin Inlet." },
        { key: "ON", value: "ontario", metaTitle: "Ontario Movie Theaters | Find Cinemas & Showtimes in Ontario ", metaDescription: "Browse movie theaters across Ontario. Find showtimes, locations, and book tickets at cinemas near you — from Toronto to Ottawa." },
        { key: "PE", value: "prince-edward-island", metaTitle: "Prince Edward Island Movie Theaters | Find Cinemas & Showtimes in Prince Edward Island ", metaDescription: "Browse movie theaters across Prince Edward Island. Find showtimes, locations, and book tickets at cinemas near you — from Charlottetown to Summerside." },
        { key: "QC", value: "quebec", metaTitle: "Quebec Movie Theaters | Find Cinemas & Showtimes in Quebec ", metaDescription: "Browse movie theaters across Quebec. Find showtimes, locations, and book tickets at cinemas near you — from Montreal to Quebec City." },
        { key: "SK", value: "saskatchewan", metaTitle: "Saskatchewan Movie Theaters | Find Cinemas & Showtimes in Saskatchewan ", metaDescription: "Browse movie theaters across Saskatchewan. Find showtimes, locations, and book tickets at cinemas near you — from Saskatoon to Regina." },
        { key: "YT", value: "yukon", metaTitle: "Yukon Movie Theaters | Find Cinemas & Showtimes in Yukon ", metaDescription: "Browse movie theaters across Yukon. Find showtimes, locations, and book tickets at cinemas near you — from Whitehorse to Dawson City." }
    ],
    menu: {
        mega_menu: [
            {
                url: "/box-office/",
                title: "Box Office",
                child_items: [
                    {
                        url: "/box-office/results/",
                        title: "Results"
                    },
                    {
                        "url": "/box-office/totals/",
                        "title": "Totals"
                    },
                    {
                        "url": "/box-office/highest-grossing/",
                        "title": "Highest Grossing"
                    }
                ]
            },
            {
                url: "/movies/",
                title: "Movies",
                child_items: [
                    {
                        url: "/movies/releases-by-week/",
                        title: "New Movies This Week"
                    },
                    {
                        url: "/movies/upcoming-movies/",
                        title: "Upcoming Movies"
                    },
                    {
                        url: "/movies/release-schedule/",
                        title: "Release Schedule"
                    },
                    {
                        url: "/movies/release-changes/",
                        title: "Release Changes"
                    },
                    {
                        url: "/movies/a-z/",
                        title: "Movies A-Z"
                    },
                    {
                        url: "/movies/reviews/",
                        title: "Reviews"
                    }
                ]
            },

            {
                url: "/directory/",
                title: "Directory",
                child_items: [
                    {
                        url: "/directory/distributors/",
                        title: "Distributors"
                    },
                    {
                        url: "/directory/exhibitors/",
                        title: "Exhibitors"
                    },
                    {
                        url: "/directory/theatres/",
                        title: "Theatres"
                    },
                    {
                        url: "/directory/vendors/",
                        title: "Vendors"
                    },
                    {
                        url: "/directory/film-festivals/",
                        title: "Film Festivals"
                    },
                    {
                        url: "/directory/associations/",
                        title: "Associations"
                    }
                ]
            },
            {
                url: "/news/",
                title: "News",
                child_items: [
                    // {
                    //     url: "/news/press-release/",
                    //     title: "Press Release"
                    // },
                    {
                        url: "/news/industry-news/",
                        title: "Industry News"
                    },
                    {
                        url: "/news/box-office-outlook/",
                        title: "Box Office Outlook"
                    },
                    {
                        url: "/news/dick-walshs-industry-update/",
                        title: "Industry Update"
                    },
                    {
                        url: "/news/hollywood-report/",
                        title: "Hollywood Report"
                    },
                    {
                        url: "/headlines/",
                        title: "Headlines"
                    },
                    {
                        url: "/news/press-releases/",
                        title: "Press Release"
                    }
                ],

            },
            {
                // url: "/video/",
                // title: "Videos",
                // child_items: [
                //     {
                //         url: "/video/trailers-clips/",
                //         title: "Trailers & Clips"
                //     }
                // ],
                url: "/blog/",
                title: "Blog",
                child_items: [
                    {
                        url: "/blog/editorials/",
                        title: "Editorials"
                    },
                    {
                        url: "/blog/lists/",
                        title: "All Time Lists"
                    },
                    {
                        url: "/blog/celebrity-spotlight/",
                        title: "Celebrity Spotlight"
                    },
                    {
                        url: "/blog/streaming/",
                        title: "Streaming"
                    }
                ],
                url2: "/about-screendollars/",
                title2: "About Screendollars",
                child_items2: [
                    {
                        url: "/advertise-with-us/",
                        title: "Advertise with Us"
                    },
                    {
                        url: "/contact-us/",
                        title: "Contact Screendollars"
                    },
                    {
                        url: "/authors/",
                        title: "Authors"
                    }
                ]
            }
        ],
        main_menu: [
            {
                url: "/",
                title: "Home"
            },
            {
                url: "/box-office/",
                title: "Box Office",
                sub_menu_items: [
                    {
                        url: "/box-office/results/",
                        title: "Results"
                    },
                    {
                        url: "/box-office/totals/",
                        title: "Totals",
                        sub_sub_menu_items: [
                            {
                                url: "/box-office/totals/",
                                title: "All Years"
                            },
                            {
                                url: "/box-office/totals/rating/",
                                "title": "All Years by Rating"
                            },
                            {
                                url: "/box-office/totals/genre/",
                                title: "All Years by Genre"
                            },
                            {
                                url: `/box-office/totals/${currentYear}/`,
                                title: "By Year"
                            },
                            {
                                url: `/box-office/totals/${currentYear}/Q${currentQuarter}/`,
                                title: " By Quarter"
                            }
                        ]
                    },
                    {
                        url: "/box-office/highest-grossing/",
                        title: "Highest Grossing",
                        sub_sub_menu_items: [
                            {
                                url: `/box-office/highest-grossing/${currentYear}/`,
                                title: "By Year"
                            },
                            {
                                url: `/box-office/highest-grossing/${currentYear}/all-ratings/`,
                                title: "By Rating"
                            },
                            {
                                url: `/box-office/highest-grossing/${currentYear}/all-ratings/all-genres/`,
                                title: "By Genre"
                            }
                        ]
                    }
                ]
            },
            {
                url: "/movies/",
                title: "Movies",
                sub_menu_items: [
                    {
                        url: "/movies/releases-by-week/",
                        title: "New Movies This Week",
                    },
                    {
                        url: "/movies/upcoming-movies/",
                        title: "Upcoming Movies",
                    },
                    {
                        url: "/movies/release-schedule/",
                        title: "Release Schedule"
                    },
                    {
                        url: "/movies/release-changes/",
                        title: "Release Changes"
                    },
                    {
                        url: "/movies/a-z/",
                        title: "Movies A-Z"
                    },
                    {
                        url: "/movies/reviews/",
                        title: "Reviews"
                    }
                ]
            },
            {
                url: "/celebrities/",
                title: "Celebrities"
            },
            // {
            //     url: "/video/",
            //     title: "Videos"
            // },
            {
                url: "/directory/",
                title: "Directory",
                sub_menu_items: [
                    {
                        url: "/directory/distributors/",
                        title: "Distributors"
                    },
                    {
                        url: "/directory/exhibitors/",
                        title: "Exhibitors"
                    },
                    {
                        url: "/directory/theatres/",
                        title: "Theatres"
                    },
                    {
                        url: "/directory/vendors/",
                        title: "Vendors"
                    },
                    {
                        url: "/directory/film-festivals/",
                        title: "Film Festivals"
                    },
                    {
                        url: "/directory/associations/",
                        title: "Associations"
                    }
                ]
            },
            {
                title: "News",
                url: "/news/",
                sub_menu_items: [
                    // {
                    //     url: "/news/press-release/",
                    //     title: "Press Release"
                    // },
                    {
                        url: "/news/industry-news/",
                        title: "Industry News"
                    },
                    {
                        url: "/news/box-office-outlook/",
                        title: "Box Office Outlook"
                    },
                    {
                        url: "/news/dick-walshs-industry-update/",
                        title: "Industry Update"
                    },
                    {
                        url: "/news/hollywood-report/",
                        title: "Hollywood Report"
                    },
                    {
                        url: "/headlines/",
                        title: "Headlines"
                    },
                    {
                        url: "/news/press-releases/",
                        title: "Press Releases"
                    }
                ]
            },
            {
                title: "Blog",
                url: "/blog/",
                sub_menu_items: [
                    {
                        url: "/blog/editorials/",
                        title: "Editorials"
                    },
                    {
                        url: "/blog/lists/",
                        title: "All Time Lists"
                    },
                    {
                        url: "/blog/celebrity-spotlight/",
                        title: "Celebrity Spotlight"
                    },
                    {
                        url: "/blog/streaming/",
                        title: "Streaming"
                    }
                ]
            },
            {
                url: "/newsletter/",
                title: "Newsletter"
            }
        ],
        More: [
            {
                url: "/about-screendollars/",
                title: "About Us"
            },
            {
                url: "/advertise-with-us/",
                title: "Advertise with us"
            },
            {
                url: "/contact-us/",
                title: "Contact screendollars"
            }
        ],
        pro_menu_items: [
            {
                text: "Newsletters",
                link: "/pro/newsletters",
                sub_menu: ""
            },
            {
                text: "ADVANCED MOVIE DATA",
                link: "/pro/advanced-movie-data",
                sub_menu: ""
            },
            {
                text: "FAQ",
                link: "/pro/faq",
                sub_menu: ""
            },
            {
                text: "Back to Screendollars.com",
                link: "/",
                sub_menu: ""
            },
            {
                text: "Sunday",
                link: "/newsletter/",
                sub_menu: "1"
            },
            {
                text: "Wednesday Report",
                link: "/pro/newsletters/wed",
                sub_menu: "1"
            }
        ]
    },
    AZMoviesData: [
        {
            key: "A",
            pageHeading: "Movies Starting with A",
            pageContent: "Browse our complete collection of movies beginning with the letter A. From popular titles like 'Avatar' and 'Avengers: Endgame' to award-winning dramas and independent films, discover movies organized alphabetically. Each listing may include release dates, box office performance, cast details, and theatrical distribution information when available.",
            metaTitle: "Movies Starting with A: Complete Alphabetical List",
            metaDescription: "Browse movies starting with A. Complete alphabetical list of films including Avatar, Avengers: Endgame, and many more. View release dates, box office data, and theater distribution details."
        },
        {
            key: "B",
            pageHeading: "Movies Starting with B",
            pageContent: "Browse our complete collection of movies beginning with the letter B. From popular titles like 'Batman Begins' and 'Black Panther' to award-winning dramas and independent films, discover movies organized alphabetically. Each listing may include release dates, box office performance, cast details, and theatrical distribution information when available.",
            metaTitle: "Movies Starting with B: Complete Alphabetical List",
            metaDescription: "Browse movies starting with B. Complete alphabetical list of films including Batman Begins, Black Panther, and many more. View release dates, box office data, and theater distribution details."
        },
        {
            key: "C",
            pageHeading: "Movies Starting with C",
            pageContent: "Browse our complete collection of movies beginning with the letter C. From popular titles like 'Captain America: Civil War' and 'Coco' to award-winning dramas and independent films, discover movies organized alphabetically. Each listing may include release dates, box office performance, cast details, and theatrical distribution information when available.",
            metaTitle: "Movies Starting with C: Complete Alphabetical List",
            metaDescription: "Browse movies starting with C. Complete alphabetical list of films including Captain America: Civil War, Coco, and many more. View release dates, box office data, and theater distribution details."
        },
        {
            key: "D",
            pageHeading: "Movies Starting with D",
            pageContent: "Browse our complete collection of movies beginning with the letter D. From popular titles like 'Deadpool' and 'Dune' to award-winning dramas and independent films, discover movies organized alphabetically. Each listing may include release dates, box office performance, cast details, and theatrical distribution information when available.",
            metaTitle: "Movies Starting with D: Complete Alphabetical List",
            metaDescription: "Browse movies starting with D. Complete alphabetical list of films including Deadpool, Dune, and many more. View release dates, box office data, and theater distribution details."
        },
        {
            key: "E",
            pageHeading: "Movies Starting with E",
            pageContent: "Browse our complete collection of movies beginning with the letter E. From popular titles like 'Encanto' and 'Edge of Tomorrow' to award-winning dramas and independent films, discover movies organized alphabetically. Each listing may include release dates, box office performance, cast details, and theatrical distribution information when available.",
            metaTitle: "Movies Starting with E: Complete Alphabetical List",
            metaDescription: "Browse movies starting with E. Complete alphabetical list of films including Encanto, Edge of Tomorrow, and many more. View release dates, box office data, and theater distribution details."
        },
        {
            key: "F",
            pageHeading: "Movies Starting with F",
            pageContent: "Browse our complete collection of movies beginning with the letter F. From popular titles like 'Frozen' and 'Fast & Furious' to award-winning dramas and independent films, discover movies organized alphabetically. Each listing may include release dates, box office performance, cast details, and theatrical distribution information when available.",
            metaTitle: "Movies Starting with F: Complete Alphabetical List",
            metaDescription: "Browse movies starting with F. Complete alphabetical list of films including Frozen, Fast & Furious, and many more. View release dates, box office data, and theater distribution details."
        },
        {
            key: "G",
            pageHeading: "Movies Starting with G",
            pageContent: "Browse our complete collection of movies beginning with the letter G. From popular titles like 'Gladiator' and 'Gravity' to award-winning dramas and independent films, discover movies organized alphabetically. Each listing may include release dates, box office performance, cast details, and theatrical distribution information when available.",
            metaTitle: "Movies Starting with G: Complete Alphabetical List",
            metaDescription: "Browse movies starting with G. Complete alphabetical list of films including Gladiator, Gravity, and many more. View release dates, box office data, and theater distribution details."
        },
        {
            key: "H",
            pageHeading: "Movies Starting with H",
            pageContent: "Browse our complete collection of movies beginning with the letter H. From popular titles like 'Harry Potter and the Sorcerer's Stone' and 'Home Alone' to award-winning dramas and independent films, discover movies organized alphabetically. Each listing may include release dates, box office performance, cast details, and theatrical distribution information when available.",
            metaTitle: "Movies Starting with H: Complete Alphabetical List",
            metaDescription: "Browse movies starting with H. Complete alphabetical list of films including Harry Potter and the Sorcerer's Stone, Home Alone, and many more. View release dates, box office data, and theater distribution details."
        },
        {
            key: "I",
            pageHeading: "Movies Starting with I",
            pageContent: "Browse our complete collection of movies beginning with the letter I. From popular titles like 'Inception' and 'Inside Out' to award-winning dramas and independent films, discover movies organized alphabetically. Each listing may include release dates, box office performance, cast details, and theatrical distribution information when available.",
            metaTitle: "Movies Starting with I: Complete Alphabetical List",
            metaDescription: "Browse movies starting with I. Complete alphabetical list of films including Inception, Inside Out, and many more. View release dates, box office data, and theater distribution details."
        },
        {
            key: "J",
            pageHeading: "Movies Starting with J",
            pageContent: "Browse our complete collection of movies beginning with the letter J. From popular titles like 'Joker' and 'Jumanji' to award-winning dramas and independent films, discover movies organized alphabetically. Each listing may include release dates, box office performance, cast details, and theatrical distribution information when available.",
            metaTitle: "Movies Starting with J: Complete Alphabetical List",
            metaDescription: "Browse movies starting with J. Complete alphabetical list of films including Joker, Jumanji, and many more. View release dates, box office data, and theater distribution details."
        },
        {
            key: "K",
            pageHeading: "Movies Starting with K",
            pageContent: "Browse our complete collection of movies beginning with the letter K. From popular titles like 'King Kong' and 'Knives Out' to award-winning dramas and independent films, discover movies organized alphabetically. Each listing may include release dates, box office performance, cast details, and theatrical distribution information when available.",
            metaTitle: "Movies Starting with K: Complete Alphabetical List",
            metaDescription: "Browse movies starting with K. Complete alphabetical list of films including King Kong, Knives Out, and many more. View release dates, box office data, and theater distribution details."
        },
        {
            key: "L",
            pageHeading: "Movies Starting with L",
            pageContent: "Browse our complete collection of movies beginning with the letter L. From popular titles like 'La La Land' and 'Logan' to award-winning dramas and independent films, discover movies organized alphabetically. Each listing may include release dates, box office performance, cast details, and theatrical distribution information when available.",
            metaTitle: "Movies Starting with L: Complete Alphabetical List",
            metaDescription: "Browse movies starting with L. Complete alphabetical list of films including La La Land, Logan, and many more. View release dates, box office data, and theater distribution details."
        },
        {
            key: "M",
            pageHeading: "Movies Starting with M",
            pageContent: "Browse our complete collection of movies beginning with the letter M. From popular titles like 'The Matrix' and 'Moana' to award-winning dramas and independent films, discover movies organized alphabetically. Each listing may include release dates, box office performance, cast details, and theatrical distribution information when available.",
            metaTitle: "Movies Starting with M: Complete Alphabetical List",
            metaDescription: "Browse movies starting with M. Complete alphabetical list of films including The Matrix, Moana, and many more. View release dates, box office data, and theater distribution details."
        },
        {
            key: "N",
            pageHeading: "Movies Starting with N",
            pageContent: "Browse our complete collection of movies beginning with the letter N. From popular titles like 'No Time to Die' and 'Nightcrawler' to award-winning dramas and independent films, discover movies organized alphabetically. Each listing may include release dates, box office performance, cast details, and theatrical distribution information when available.",
            metaTitle: "Movies Starting with N: Complete Alphabetical List",
            metaDescription: "Browse movies starting with N. Complete alphabetical list of films including No Time to Die, Nightcrawler, and many more. View release dates, box office data, and theater distribution details."
        },
        {
            key: "O",
            pageHeading: "Movies Starting with O",
            pageContent: "Browse our complete collection of movies beginning with the letter O. From popular titles like 'Oppenheimer' and 'Ocean's Eleven' to award-winning dramas and independent films, discover movies organized alphabetically. Each listing may include release dates, box office performance, cast details, and theatrical distribution information when available.",
            metaTitle: "Movies Starting with O: Complete Alphabetical List",
            metaDescription: "Browse movies starting with O. Complete alphabetical list of films including Oppenheimer, Ocean's Eleven, and many more. View release dates, box office data, and theater distribution details."
        },
        {
            key: "P",
            pageHeading: "Movies Starting with P",
            pageContent: "Browse our complete collection of movies beginning with the letter P. From popular titles like 'Pirates of the Caribbean' and 'Paddington' to award-winning dramas and independent films, discover movies organized alphabetically. Each listing may include release dates, box office performance, cast details, and theatrical distribution information when available.",
            metaTitle: "Movies Starting with P: Complete Alphabetical List",
            metaDescription: "Browse movies starting with P. Complete alphabetical list of films including Pirates of the Caribbean, Paddington, and many more. View release dates, box office data, and theater distribution details."
        },
        {
            key: "Q",
            pageHeading: "Movies Starting with Q",
            pageContent: "Browse our complete collection of movies beginning with the letter Q. From popular titles like 'Quantum of Solace' and 'Queen & Slim' to award-winning dramas and independent films, discover movies organized alphabetically. Each listing may include release dates, box office performance, cast details, and theatrical distribution information when available.",
            metaTitle: "Movies Starting with Q: Complete Alphabetical List",
            metaDescription: "Browse movies starting with Q. Complete alphabetical list of films including Quantum of Solace, Queen & Slim, and many more. View release dates, box office data, and theater distribution details."
        },
        {
            key: "R",
            pageHeading: "Movies Starting with R",
            pageContent: "Browse our complete collection of movies beginning with the letter R. From popular titles like 'Rocky' and 'Ratatouille' to award-winning dramas and independent films, discover movies organized alphabetically. Each listing may include release dates, box office performance, cast details, and theatrical distribution information when available.",
            metaTitle: "Movies Starting with R: Complete Alphabetical List",
            metaDescription: "Browse movies starting with R. Complete alphabetical list of films including Rocky, Ratatouille, and many more. View release dates, box office data, and theater distribution details."
        },
        {
            key: "S",
            pageHeading: "Movies Starting with S",
            pageContent: "Browse our complete collection of movies beginning with the letter S. From popular titles like 'Spider-Man' and 'Shrek' to award-winning dramas and independent films, discover movies organized alphabetically. Each listing may include release dates, box office performance, cast details, and theatrical distribution information when available.",
            metaTitle: "Movies Starting with S: Complete Alphabetical List",
            metaDescription: "Browse movies starting with S. Complete alphabetical list of films including Spider-Man, Shrek, and many more. View release dates, box office data, and theater distribution details."
        },
        {
            key: "T",
            pageHeading: "Movies Starting with T",
            pageContent: "Browse our complete collection of movies beginning with the letter T. From popular titles like 'Titanic' and 'Toy Story' to award-winning dramas and independent films, discover movies organized alphabetically. Each listing may include release dates, box office performance, cast details, and theatrical distribution information when available.",
            metaTitle: "Movies Starting with T: Complete Alphabetical List",
            metaDescription: "Browse movies starting with T. Complete alphabetical list of films including Titanic, Toy Story, and many more. View release dates, box office data, and theater distribution details."
        },
        {
            key: "U",
            pageHeading: "Movies Starting with U",
            pageContent: "Browse our complete collection of movies beginning with the letter U. From popular titles like 'Up' and 'Uncharted' to award-winning dramas and independent films, discover movies organized alphabetically. Each listing may include release dates, box office performance, cast details, and theatrical distribution information when available.",
            metaTitle: "Movies Starting with U: Complete Alphabetical List",
            metaDescription: "Browse movies starting with U. Complete alphabetical list of films including Up, Uncharted, and many more. View release dates, box office data, and theater distribution details."
        },
        {
            key: "V",
            pageHeading: "Movies Starting with V",
            pageContent: "Browse our complete collection of movies beginning with the letter V. From popular titles like 'Venom' and 'V for Vendetta' to award-winning dramas and independent films, discover movies organized alphabetically. Each listing may include release dates, box office performance, cast details, and theatrical distribution information when available.",
            metaTitle: "Movies Starting with V: Complete Alphabetical List",
            metaDescription: "Browse movies starting with V. Complete alphabetical list of films including Venom, V for Vendetta, and many more. View release dates, box office data, and theater distribution details."
        },
        {
            key: "W",
            pageHeading: "Movies Starting with W",
            pageContent: "Browse our complete collection of movies beginning with the letter W. From popular titles like 'Wonder Woman' and 'WALL-E' to award-winning dramas and independent films, discover movies organized alphabetically. Each listing may include release dates, box office performance, cast details, and theatrical distribution information when available.",
            metaTitle: "Movies Starting with W: Complete Alphabetical List",
            metaDescription: "Browse movies starting with W. Complete alphabetical list of films including Wonder Woman, WALL-E, and many more. View release dates, box office data, and theater distribution details."
        },
        {
            key: "X",
            pageHeading: "Movies Starting with X",
            pageContent: "Browse our complete collection of movies beginning with the letter X. From popular titles like 'X-Men' and 'X2' to award-winning dramas and independent films, discover movies organized alphabetically. Each listing may include release dates, box office performance, cast details, and theatrical distribution information when available.",
            metaTitle: "Movies Starting with X: Complete Alphabetical List",
            metaDescription: "Browse movies starting with X. Complete alphabetical list of films including X-Men, X2, and many more. View release dates, box office data, and theater distribution details."
        },
        {
            key: "Y",
            pageHeading: "Movies Starting with Y",
            pageContent: "Browse our complete collection of movies beginning with the letter Y. From popular titles like 'Yes Man' and 'Yesterday' to award-winning dramas and independent films, discover movies organized alphabetically. Each listing may include release dates, box office performance, cast details, and theatrical distribution information when available.",
            metaTitle: "Movies Starting with Y: Complete Alphabetical List",
            metaDescription: "Browse movies starting with Y. Complete alphabetical list of films including Yes Man, Yesterday, and many more. View release dates, box office data, and theater distribution details."
        },
        {
            key: "Z",
            pageHeading: "Movies Starting with Z",
            pageContent: "Browse our complete collection of movies beginning with the letter Z. From popular titles like 'Zootopia' and 'Zodiac' to award-winning dramas and independent films, discover movies organized alphabetically. Each listing may include release dates, box office performance, cast details, and theatrical distribution information when available.",
            metaTitle: "Movies Starting with Z: Complete Alphabetical List",
            metaDescription: "Browse movies starting with Z. Complete alphabetical list of films including Zootopia, Zodiac, and many more. View release dates, box office data, and theater distribution details."
        },
        {
            key: '0',
            pageHeading: "Movies Starting with 0",
            pageContent: "Think no movies start with 0? Think again. Explore a complete list of rare and surprising film titles you’ve probably never seen before.",
            metaTitle: "Movie Titles Starting With 0 | Full List",
            metaDescription: "Think no movies start with 0? Think again. Explore a complete list of rare and surprising film titles you’ve probably never seen before."
        },
        {
            key: '1',
            pageHeading: "Movies Starting with 1",
            pageContent: "Explore every movie title that starts with 1, from iconic films to hidden gems. Browse the full list and uncover titles you didn’t know existed.",
            metaTitle: "Movie Titles Starting With 1: Surprising Films You Didn’t Know Exist",
            metaDescription: "Explore every movie title that starts with 1, from iconic films to hidden gems. Browse the full list and uncover titles you didn’t know existed."
        },
        {
            key: '2',
            pageHeading: "Movies Starting with 2",
            pageContent: "Discover movie titles starting with 2, including sequels, cult favorites, and rare finds. Explore the complete list in one place.",
            metaTitle: "Movie Titles Starting With 2: Full List of Sequels & Hidden Gems",
            metaDescription: "Discover movie titles starting with 2, including sequels, cult favorites, and rare finds. Explore the complete list in one place."
        },
        {
            key: '3',
            pageHeading: "Movies Starting with 3",
            pageContent: "From trilogies to unexpected gems, explore all movie titles starting with 3. Browse the full list and find something new.",
            metaTitle: "Movie Titles Starting With 3: Complete List + Must-Know Picks",
            metaDescription: "From trilogies to unexpected gems, explore all movie titles starting with 3. Browse the full list and find something new."
        },
        {
            key: '4',
            pageHeading: "Movies Starting with 4",
            pageContent: "Dive into movie titles starting with 4, featuring action-packed hits, indie films, and hidden gems. See the complete list now.",
            metaTitle: "Movie Titles Starting With 4: Full List of Action Hits & Rare Finds",
            metaDescription: "Dive into movie titles starting with 4, featuring action-packed hits, indie films, and hidden gems. See the complete list now."
        },
        {
            key: '5',
            pageHeading: "Movies Starting with 5",
            pageContent: "Explore movie titles that begin with 5, from popular releases to lesser-known films. Browse the full list and discover more.",
            metaTitle: "Movie Titles Starting With 5: Complete List of Popular & Hidden Films",
            metaDescription: "Explore movie titles that begin with 5, from popular releases to lesser-known films. Browse the full list and discover more."
        },
        {
            key: '6',
            pageHeading: "Movies Starting with 6",
            pageContent: "Looking for movies starting with 6? Discover a complete list of unique, classic, and hard-to-find titles in one place.",
            metaTitle: "Movie Titles Starting With 6: Full List of Unique & Rare Titles",
            metaDescription: "Looking for movies starting with 6? Discover a complete list of unique, classic, and hard-to-find titles in one place."
        },
        {
            key: '7',
            pageHeading: "Movies Starting with 7",
            pageContent: "Uncover movie titles starting with 7, including thrillers, cult classics, and rare picks. Browse the full list now.",
            metaTitle: "Movie Titles Starting With 7: Thrillers, Classics & Full List",
            metaDescription: "Uncover movie titles starting with 7, including thrillers, cult classics, and rare picks. Browse the full list now."
        },
        {
            key: '8',
            pageHeading: "Movies Starting with 8",
            pageContent: "Explore movie titles that start with 8, from standout films to hidden gems. See the complete list and find your next watch.",
            metaTitle: "Movie Titles Starting With 8: Unusual Films You’ve Probably Never Heard Of",
            metaDescription: "Explore movie titles that start with 8, from standout films to hidden gems. See the complete list and find your next watch."
        },
        {
            key: '9',
            pageHeading: "Movies Starting with 9",
            pageContent: "Discover movie titles starting with 9, including unforgettable hits and lesser-known titles. Browse the full list today.",
            metaTitle: "Movie Titles Starting With 9: Full List of Iconic & Rare Movies",
            metaDescription: "Discover movie titles starting with 9, including unforgettable hits and lesser-known titles. Browse the full list today."
        }
    ],
    news_seo_data: [
        {
            key: "editorials",
            pageHeading: "Editorials, Commentary & Film Industry Opinions",
            pageContent: "Our Editorials & Opinions section goes beyond reporting the news — we explore what it means for movies, audiences, and the film industry as a whole. From analyzing franchise futures and box office impact to debating fan culture and spotlighting emerging trends, these pieces offer fresh perspectives designed to spark thought and conversation.",
            metaTitle: "Movie Editorials & Film Opinions | Culture, Commentary & Industry Perspectives",
            metaDescription: "Explore thoughtful commentary on movies, filmmaking, pop culture, fan reactions, and industry trends. Deep-dive perspectives, debates, and editorial voices that go beyond the headlines."
        },
        {
            key: "lists",
            pageHeading: "Curated Movie Lists, Rankings & Watch Guides",
            pageContent: "Looking for what to watch next? Our curated movie lists group films by theme, mood, genre, era, actors, holidays, and more — making it easy to find the perfect movie for any occasion. From non-scary Halloween picks to cozy fall comfort films, iconic franchises, top actor filmographies, all-time classics, and kid-friendly favorites, we help you build your next great watchlist.",
            metaTitle: "Movie Lists & Rankings | Top Films, Favorites & Deep-Dive Selections",
            metaDescription: "Discover curated movie lists and watchlists organized by genre, theme, mood, season, and audience. Explore top picks, fan favorites, classics, comfort films, kid-friendly selections, actor spotlights, and more."
        },
        {
            key: "dick-walshs-industry-update",
            pageHeading: "Dick Walsh's Industry Update",
            pageContent: "Follow Dick Walsh's Industry Update for expert commentary on weekly box office results, theatrical performance, and movie market trends. This weekly column delivers context, data, and clarity straight from one of the industry's most trusted voices.",
            metaTitle: "Dick Walsh's Industry Update | Expert Commentary & Market Breakdown",
            metaDescription: "In-depth film market analysis, theatrical trends, and industry intelligence from Dick Walsh."
        },
        {
            key: "industry-news",
            pageHeading: "Movie Industry News & Trends",
            pageContent: "Your source for up-to-the-minute movie industry coverage. From studio announcements to distribution shifts, Screendollars delivers verified updates and context that matter to film professionals and fans alike.",
            metaTitle: "Movie Industry News & Trends | Studio Strategies & Market Shifts",
            metaDescription: "Coverage of theatrical trends, release strategies, production developments, and industry movement shaping cinema's future."
        },
        {
            key: "box-office-outlook",
            pageHeading: "Box Office Outlook & Revenue Forecasts",
            pageContent: "Anticipate what’s next in the theatrical market with our box office outlook reports. Screendollars forecasts upcoming trends, predicts grosses, and provides analytical insights into how upcoming releases will perform.",
            metaTitle: "Box Office Outlook | Forecasts, Projections & Market Expectations",
            metaDescription: "Analysis and forecasts for upcoming theatrical releases, market behavior, and expected box office performance."
        },
        {
            key: "blog",
            pageHeading: "Editorials, Commentary & Film Industry Opinions",
            pageContent: "Stay up to date with breaking movie news, studio developments, production announcements, and shifts in the theatrical landscape. We provide context and insight to help movie fans follow what's happening across the film industry.",
            metaTitle: "Screendollars Blog | Movie Lists, Celebrities & Editorial Coverage",
            metaDescription: "Discover the latest Screendollars blog posts, including movie listicles, celebrity performance spotlights, and editorials on major film news and releases."
        },
        {
            key: "news",
            pageHeading: "Movie News & Film Industry Insights",
            pageContent: "Stay up to date with breaking movie news, studio developments, production announcements, and shifts in the theatrical landscape. We provide context and insight to help movie fans follow what’s happening across the film industry.",
            metaTitle: "Movie Industry News, Box Office & Hollywood Reports",
            metaDescription: "Get the latest movie industry news, box office outlooks, Hollywood reports, and insider updates on studios, streaming, and theatrical trends."
        },
        {
            key: "hollywood-report",
            pageHeading: "MARTIN GROVE’s Hollywood Report",
            pageContent: "Screendollars Hollywood Report covers awards-season news, nomination trends, and the industry stories shaping the Oscars race. Stay updated on the latest buzz, forecasts, and key moments.",
            metaTitle: "Hollywood Report: Awards, Oscars & Industry Buzz",
            metaDescription: "Hollywood Report covering Oscars, awards-season buzz, nominations, guild chatter, and how the entertainment industry is shaping the race."
        },
        {
            key: "celebrity-spotlight",
            pageHeading: "Celebrity Spotlight",
            pageContent: "Celebrity Spotlight features deep dives into actors, directors, and rising stars — from career breakthroughs to defining roles and cultural impact. Explore filmographies, trends, and standout performances.",
            metaTitle: "Celebrity Spotlight: Careers, Impact & Filmography",
            metaDescription: "Celebrity Spotlight features deep dives into actors and filmmakers—career breakdowns, defining roles, cultural impact, and must-watch performances."
        },
        {
            key: "streaming",
            pageHeading: "Streaming Guides, OTT Picks & What to Watch",
            pageContent: "Explore our streaming coverage beyond simple watchlists — from the best movies on Netflix and hidden gems on Prime Video to monthly picks, platform comparisons, and expert recommendations that help audiences decide what to watch next.",
            metaTitle: "Streaming Guides & OTT Recommendations | Screen Dollars",
            metaDescription: "Explore streaming guides, OTT recommendations, hidden gems, and what-to-watch picks across Netflix, Prime Video, Disney+, Max, Hulu, and more on Screen Dollars."
        }
    ],
    BLOG_CATEGORIES: ['editorials', 'lists', 'celebrity-spotlight', 'streaming'],
    NEWS_CATEGORIES: ['industry-news', 'box-office-outlook', 'dick-walshs-industry-update', 'hollywood-report', 'headlines', 'press-releases'],
    Association_SEOData: [
        {
            key: "network-of-independent-canadian-exhibitors",
            metaTitle: "Network of Independent Canadian Exhibitors (NICE)",
            metaDescription: "A not-for-profit organization supporting independent Canadian cinemas, festivals, drive-ins, and community-focused theaters with resources and curated film programs."
        },
        {
            key: "united-drive-in-theatre-owners-association",
            metaTitle: "United Drive-In Theatre Owners Association",
            metaDescription: "A not-for-profit organization serving authentic drive-in theater owners worldwide through advocacy, education, networking, and promoting the commercial exhibition of movies."
        },
        {
            key: "movie-theatre-association-of-canada",
            metaTitle: "Movie Theatre Association of Canada",
            metaDescription: "Founded in 1980, representing 3,000+ screens nationwide. The voice of Canadian exhibitors, sharing best practices and promoting unparalleled big-screen movie experiences."
        },
        {
            key: "independent-cinema-alliance",
            metaTitle: "Independent Cinema Alliance",
            metaDescription: "Advocating for independent cinemas on PVOD, shrinking windows, and studio negotiations. Giving independents a cohesive voice for industry survival and prosperity."
        },
        {
            key: "cinema-united",
            metaTitle: "Cinema United",
            metaDescription: "Founded in 1948, the world's largest exhibition trade organization representing 31,000+ US screens and 30,000+ screens across 80 countries worldwide."
        }
    ],
    Glossary_SEOData: [
        {
            key: "glossary",
            metaTitle: "Film Glossary: A-Z Movie & Filmmaking Terms | Screen Dollars",
            metaDescription: "Explore Screen Dollars’ complete A–Z film glossary featuring movie, filmmaking, cinematography, editing, sound, production, and box office terms explained in simple language."
        },
        {
            key: "glossary/a",
            metaTitle: "Film Terms Starting With A: Movie & Filmmaking Glossary",
            metaDescription: "Explore film terms starting with A, including A-Roll, ADR, Adaptation, Aerial Shot, and more movie and filmmaking definitions explained simply."
        },
        {
            key: "glossary/b",
            metaTitle: "Film Terms Starting With B: Movie & Filmmaking Glossary",
            metaDescription: "Discover film terms starting with B, including B-Roll, B-Movie, Blocking, Backlighting, and more filmmaking glossary definitions."
        },
        {
            key: "glossary/c",
            metaTitle: "Film Terms Starting With C: Movie & Filmmaking Glossary",
            metaDescription: "Browse film terms starting with C, including Cinematography, Climax, Clapperboard, Cross-Cutting, and more movie terminology."
        },
        {
            key: "glossary/d",
            metaTitle: "Film Terms Starting With D: Movie & Filmmaking Glossary",
            metaDescription: "Learn film terms starting with D, including Director, Documentary, Dolly Shot, Dailies, and more filmmaking definitions."
        },
        {
            key: "glossary/e",
            metaTitle: "Film Terms Starting With E: Movie & Filmmaking Glossary",
            metaDescription: "Explore film terms starting with E, including Editing, Editor, Exposition, Eyeline Match, and more movie glossary terms."
        },
        {
            key: "glossary/f",
            metaTitle: "Film Terms Starting With F: Movie & Filmmaking Glossary",
            metaDescription: "Discover film terms starting with F, including Fade, Foley, Framing, Feature Film, and more filmmaking terminology."
        },
        {
            key: "glossary/g",
            metaTitle: "Film Terms Starting With G: Movie & Filmmaking Glossary",
            metaDescription: "Browse film terms starting with G, including Gaffer, Genre, Grip, and more movie production and filmmaking terms."
        },
        {
            key: "glossary/h",
            metaTitle: "Film Terms Starting With H: Movie & Filmmaking Glossary",
            metaDescription: "Learn film terms starting with H, including Handheld Shot, Headroom, Hero Prop, and more filmmaking glossary definitions."
        },
        {
            key: "glossary/i",
            metaTitle: "Film Terms Starting With I: Movie & Filmmaking Glossary",
            metaDescription: "Explore film terms starting with I, including ISO, Insert Shot, Inciting Incident, and more movie and filmmaking terminology."
        },
        {
            key: "glossary/j",
            metaTitle: "Film Terms Starting With J: Movie & Filmmaking Glossary",
            metaDescription: "Discover film terms starting with J, including Jump Cut, J-Cut, and more editing and filmmaking glossary definitions."
        },
        {
            key: "glossary/k",
            metaTitle: "Film Terms Starting With K: Movie & Filmmaking Glossary",
            metaDescription: "Browse film terms starting with K, including Key Light, Key Grip, and more cinematography and filmmaking terminology."
        },
        {
            key: "glossary/l",
            metaTitle: "Film Terms Starting With L: Movie & Filmmaking Glossary",
            metaDescription: "Learn film terms starting with L, including Lighting, Lens, Long Shot, and more movie production glossary definitions."
        },
        {
            key: "glossary/m",
            metaTitle: "Film Terms Starting With M: Movie & Filmmaking Glossary",
            metaDescription: "Explore film terms starting with M, including Montage, Match Cut, Mise-en-Scène, and more filmmaking terminology."
        },
        {
            key: "glossary/n",
            metaTitle: "Film Terms Starting With N: Movie & Filmmaking Glossary",
            metaDescription: "Discover film terms starting with N, including Narrative, Non-Diegetic Sound, and more movie glossary definitions."
        },
        {
            key: "glossary/o",
            metaTitle: "Film Terms Starting With O: Movie & Filmmaking Glossary",
            metaDescription: "Browse film terms starting with O, including Over-the-Shoulder Shot and more filmmaking and cinema terminology."
        },
        {
            key: "glossary/p",
            metaTitle: "Film Terms Starting With P: Movie & Filmmaking Glossary",
            metaDescription: "Learn film terms starting with P, including Pan Shot, Post-Production, Producer, POV Shot, and more movie definitions."
        },
        {
            key: "glossary/q",
            metaTitle: "Film Terms Starting With Q: Movie & Filmmaking Glossary",
            metaDescription: "Explore film terms starting with Q, including Quick Cut and more movie editing and filmmaking glossary definitions."
        },
        {
            key: "glossary/r",
            metaTitle: "Film Terms Starting With R: Movie & Filmmaking Glossary",
            metaDescription: "Discover film terms starting with R, including Resolution, Rough Cut, Rack Focus, and more filmmaking terminology."
        },
        {
            key: "glossary/s",
            metaTitle: "Film Terms Starting With S: Movie & Filmmaking Glossary",
            metaDescription: "Browse film terms starting with S, including Screenplay, Steadicam, Shot List, and more movie production terms."
        },
        {
            key: "glossary/t",
            metaTitle: "Film Terms Starting With T: Movie & Filmmaking Glossary",
            metaDescription: "Learn film terms starting with T, including Tracking Shot, Take, Three-Point Lighting, and more filmmaking definitions."
        },
        {
            key: "glossary/u",
            metaTitle: "Film Terms Starting With U: Movie & Filmmaking Glossary",
            metaDescription: "Explore film terms starting with U, including Underexposure and more cinematography and filmmaking glossary terms."
        },
        {
            key: "glossary/v",
            metaTitle: "Film Terms Starting With V: Movie & Filmmaking Glossary",
            metaDescription: "Discover film terms starting with V, including Voice-Over, Visual Effects, and more movie production terminology."
        },
        {
            key: "glossary/w",
            metaTitle: "Film Terms Starting With W: Movie & Filmmaking Glossary",
            metaDescription: "Browse film terms starting with W, including Wide Shot, Wipe, and more filmmaking and cinema glossary definitions."
        },
        {
            key: "glossary/x",
            metaTitle: "Film Terms Starting With X: Movie & Filmmaking Glossary",
            metaDescription: "Explore film terms starting with X and discover rare movie and filmmaking glossary definitions explained simply."
        },
        {
            key: "glossary/y",
            metaTitle: "Film Terms Starting With Y: Movie & Filmmaking Glossary",
            metaDescription: "Browse film terms starting with Y and explore filmmaking terminology and movie production glossary definitions."
        },
        {
            key: "glossary/z",
            metaTitle: "Film Terms Starting With Z: Movie & Filmmaking Glossary",
            metaDescription: "Learn film terms starting with Z, including Zoom Shot and more movie and filmmaking terminology explained clearly."
        },
        {
            key: "glossary/a/a-roll/",
            metaTitle: "What Is A-Roll in Film? Definition & Meaning Explained",
            metaDescription: "Learn what A-Roll means in film and video production. Discover the definition, examples, and differences between A-Roll and B-Roll."
        },
        {
            key: "glossary/a/action/",
            metaTitle: "What Does Action Mean in Film? Movie Term Explained",
            metaDescription: "Learn what “Action!” means on a film set, why directors use it, and how it signals the start of a take in filmmaking."
        },
        {
            key: "glossary/a/adaptation/",
            metaTitle: "What Is an Adaptation in Film? Definition Explained",
            metaDescription: "Discover what adaptation means in movies, how books become films, and why adaptations are important in Hollywood filmmaking."
        },
        {
            key: "glossary/a/adr/",
            metaTitle: "What Is ADR in Film? Automated Dialogue Replacement Explained",
            metaDescription: "Learn what ADR means in filmmaking, how dialogue is re-recorded in post-production, and why ADR is used in movies."
        },
        {
            key: "glossary/a/aerial-shot/",
            metaTitle: "What Is an Aerial Shot? Film Term Explained",
            metaDescription: "Discover what an aerial shot is in filmmaking, how drone and helicopter shots work, and why filmmakers use them."
        },
        {
            key: "glossary/b/b-movie/",
            metaTitle: "What Is a B-Movie? Film Definition Explained",
            metaDescription: "Learn what defines a B-Movie, its history in cinema, and why low-budget genre films became cult classics."
        },
        {
            key: "glossary/b/b-roll/",
            metaTitle: "What Is B-Roll in Film? Meaning & Examples Explained",
            metaDescription: "Learn what B-Roll means in filmmaking, how editors use supplementary footage, and why B-Roll matters in storytelling."
        },
        {
            key: "glossary/b/backlighting/",
            metaTitle: "What Is Backlighting in Film? Cinematography Explained",
            metaDescription: "Discover how backlighting works in cinematography, why filmmakers use it, and how it creates dramatic visual depth."
        },
        {
            key: "glossary/b/best-boy/",
            metaTitle: "What Is a Best Boy in Film Production? Explained",
            metaDescription: "Learn what a Best Boy does on a film set, including the Best Boy Electric and Best Boy Grip roles in production."
        },
        {
            key: "glossary/b/blocking/",
            metaTitle: "What Is Blocking in Film? Definition & Meaning Explained",
            metaDescription: "Discover what blocking means in filmmaking, how directors stage actors, and why blocking shapes visual storytelling."
        },
        {
            key: "glossary/b/box-office/",
            metaTitle: "What Is the Box Office? Movie Industry Term Explained",
            metaDescription: "Learn what box office means in the film industry, how movie revenue is tracked, and why box office numbers matter."
        },
        {
            key: "glossary/c/camera-movement/",
            metaTitle: "What Is Camera Movement in Film? Types Explained",
            metaDescription: "Discover different types of camera movement in filmmaking, including dolly shots, pans, handheld shots, and tracking shots."
        },
        {
            key: "glossary/c/cinematography/",
            metaTitle: "What Is Cinematography? Film Definition Explained",
            metaDescription: "Learn what cinematography means in film, including lighting, framing, camera movement, and visual storytelling techniques."
        },
        {
            key: "glossary/c/clapperboard/",
            metaTitle: "What Is a Clapperboard in Film? Explained",
            metaDescription: "Discover what a clapperboard is, how it syncs sound and picture, and why it is essential in movie production."
        },
        {
            key: "glossary/c/climax/",
            metaTitle: "What Is a Climax in Film? Storytelling Term Explained",
            metaDescription: "Learn what the climax means in movies, why it is the most intense moment in a story, and how it resolves conflict."
        },
        {
            key: "glossary/c/close-up/",
            metaTitle: "What Is a Close-Up Shot? Film Term Explained",
            metaDescription: "Discover what a close-up shot is in filmmaking and how directors use close framing to create emotional impact."
        },
        {
            key: "glossary/c/continuity-editing/",
            metaTitle: "What Is Continuity Editing? Film Editing Explained",
            metaDescription: "Learn how continuity editing works in movies, including eyeline matches, match cuts, and seamless scene transitions."
        },
        {
            key: "glossary/c/cross-cutting/",
            metaTitle: "What Is Cross-Cutting in Film? Editing Technique Explained",
            metaDescription: "Discover what cross-cutting means in film editing and how filmmakers build tension by cutting between scenes."
        },
        {
            key: "glossary/c/cult-classic/",
            metaTitle: "What Is a Cult Classic? Movie Term Explained",
            metaDescription: "Learn what makes a film a cult classic and why some movies gain devoted fan followings years after release."
        },
        {
            key: "glossary/c/cutaway/",
            metaTitle: "What Is a Cutaway Shot? Film Editing Explained",
            metaDescription: "Discover what a cutaway shot is, how editors use it, and why cutaways improve pacing and visual storytelling."
        },
        {
            key: "glossary/d/dailies/",
            metaTitle: "What Are Dailies in Film Production? Explained",
            metaDescription: "Learn what dailies are in filmmaking, how directors review footage, and why dailies matter during production."
        },
        {
            key: "glossary/d/diegetic-sound/",
            metaTitle: "What Is Diegetic Sound? Film Sound Explained",
            metaDescription: "Discover what diegetic sound means in film and how sound inside a movie’s world differs from non-diegetic audio."
        },
        {
            key: "glossary/d/director/",
            metaTitle: "What Does a Film Director Do? Role Explained",
            metaDescription: "Learn what a director does in filmmaking, including working with actors, cinematographers, and editors."
        },
        {
            key: "glossary/d/director-of-photography/",
            metaTitle: "What Is a Director of Photography? DP Explained",
            metaDescription: "Discover what a Director of Photography does in film production and how DPs shape a movie’s visual style."
        },
        {
            key: "glossary/d/documentary/",
            metaTitle: "What Is a Documentary? Film Definition Explained",
            metaDescription: "Learn what defines a documentary film, how nonfiction storytelling works, and why documentaries matter in cinema."
        },
        {
            key: "glossary/d/documentary-filmmaking/",
            metaTitle: "What Is Documentary Filmmaking? Explained",
            metaDescription: "Discover how documentary filmmaking works, from observational shooting and interviews to editing real-world stories."
        },
        {
            key: "glossary/d/dolly-shot/",
            metaTitle: "What Is a Dolly Shot? Film Technique Explained",
            metaDescription: "Learn what a dolly shot is in filmmaking and how moving the camera creates cinematic depth and emotion."
        },
        {
            key: "glossary/d/dolly-zoom/",
            metaTitle: "What Is a Dolly Zoom? Vertigo Effect Explained",
            metaDescription: "Discover how the dolly zoom works in film, why it creates psychological tension, and famous examples in cinema."
        },
        {
            key: "glossary/e/editing/",
            metaTitle: "What Is Film Editing? Definition & Meaning Explained",
            metaDescription: "Learn how film editing shapes pacing, storytelling, rhythm, and emotion in movies during post-production."
        },
        {
            key: "glossary/e/editor/",
            metaTitle: "What Does a Film Editor Do? Role Explained",
            metaDescription: "Discover what a film editor does, how editors shape movies in post-production, and why editing is essential."
        },
        {
            key: "glossary/e/establishing-shot/",
            metaTitle: "What Is an Establishing Shot? Film Term Explained",
            metaDescription: "Learn what an establishing shot is in filmmaking and how it helps audiences understand location and geography."
        },
        {
            key: "glossary/e/exposition/",
            metaTitle: "What Is Exposition in Film? Storytelling Explained",
            metaDescription: "Discover what exposition means in movies and how filmmakers deliver story background and essential information."
        },
        {
            key: "glossary/e/eyeline-match/",
            metaTitle: "What Is an Eyeline Match? Editing Technique Explained",
            metaDescription: "Learn what an eyeline match is in film editing and how it creates continuity between characters and objects."
        },
        {
            key: "glossary/f/fade/",
            metaTitle: "What Is a Fade in Film? Editing Transition Explained",
            metaDescription: "Discover what fade-ins and fade-outs are in film editing and how they shape emotional scene transitions."
        },
        {
            key: "glossary/f/feature-film/",
            metaTitle: "What Is a Feature Film? Definition Explained",
            metaDescription: "Learn what qualifies as a feature film, typical movie runtimes, and how feature films differ from short films."
        },
        {
            key: "glossary/f/foley/",
            metaTitle: "What Is Foley in Film? Sound Design Explained",
            metaDescription: "Discover how Foley artists create realistic sound effects in movies and why Foley matters in sound design."
        },
        {
            key: "glossary/f/frame-rate/",
            metaTitle: "What Is Frame Rate in Film? FPS Explained",
            metaDescription: "Learn what frame rate means in filmmaking, why 24fps is cinematic, and how fps affects movie visuals."
        },
        {
            key: "glossary/f/framing/",
            metaTitle: "What Is Framing in Film? Cinematography Explained",
            metaDescription: "Discover what framing means in filmmaking and how composition shapes audience emotion and visual storytelling."
        },
        {
            key: "glossary/g/gaffer/",
            metaTitle: "What Does a Gaffer Do in Film Production? Explained",
            metaDescription: "Learn what a Gaffer does on a movie set and how the electrical department creates cinematic lighting."
        },
        {
            key: "glossary/g/genre/",
            metaTitle: "What Is Genre in Film? Movie Categories Explained",
            metaDescription: "Discover what genre means in cinema, how movie genres shape audience expectations, and common film categories."
        },
        {
            key: "glossary/h/handheld-shot/",
            metaTitle: "What Is a Handheld Shot? Film Technique Explained",
            metaDescription: "Learn what a handheld shot is in filmmaking and how shaky camera movement creates realism and intensity."
        },
        {
            key: "glossary/h/headroom/",
            metaTitle: "What Is Headroom in Film? Composition Explained",
            metaDescription: "Discover what headroom means in cinematography and how proper framing improves visual composition."
        },
        {
            key: "glossary/h/hero-prop/",
            metaTitle: "What Is a Hero Prop in Film? Explained",
            metaDescription: "Learn what a hero prop is in filmmaking and why featured props require detailed design for close-up shots."
        },
        {
            key: "glossary/h/high-key-lighting/",
            metaTitle: "What Is High-Key Lighting? Film Lighting Explained",
            metaDescription: "Learn what high-key lighting means in cinematography and how bright lighting creates an upbeat visual tone."
        },
        {
            key: "glossary/i/inciting-incident/",
            metaTitle: "What Is an Inciting Incident in Film? Explained",
            metaDescription: "Discover what an inciting incident means in storytelling and how it launches a movie’s central conflict."
        },
        {
            key: "glossary/i/insert-shot/",
            metaTitle: "What Is an Insert Shot? Film Definition Explained",
            metaDescription: "Learn what an insert shot is in filmmaking and how directors highlight important details on screen."
        },
        {
            key: "glossary/i/iso/",
            metaTitle: "What Is ISO in Film? Cinematography Explained",
            metaDescription: "Discover what ISO means in filmmaking, how it affects exposure, and why cinematographers adjust ISO settings."
        },
        {
            key: "glossary/j/j-cut/",
            metaTitle: "What Is a J-Cut? Editing Technique Explained",
            metaDescription: "Learn what a J-Cut is in film editing and how audio transitions smoothly connect scenes before the visual cut."
        },
        {
            key: "glossary/j/jump-cut/",
            metaTitle: "What Is a Jump Cut? Film Editing Explained",
            metaDescription: "Discover what a jump cut is in filmmaking and how editors use abrupt cuts to create rhythm and tension."
        },
        {
            key: "glossary/k/key-grip/",
            metaTitle: "What Does a Key Grip Do in Film Production? Explained",
            metaDescription: "Discover what a Key Grip does on a film set and how grip crews support lighting and camera movement."
        },
        {
            key: "glossary/k/key-light/",
            metaTitle: "What Is a Key Light? Film Lighting Explained",
            metaDescription: "Learn what a key light is in cinematography and how it shapes shadows, mood, and visual storytelling."
        },
        {
            key: "glossary/l/l-cut/",
            metaTitle: "What Is an L-Cut? Film Editing Explained",
            metaDescription: "Learn what an L-Cut is in film editing and how outgoing audio overlaps with the next scene’s visuals."
        },
        {
            key: "glossary/l/lighting/",
            metaTitle: "What Is Lighting in Film? Cinematography Explained",
            metaDescription: "Discover how lighting works in filmmaking and how cinematographers use light to create mood and depth."
        },
        {
            key: "glossary/l/long-shot/",
            metaTitle: "What Is a Long Shot? Film Shot Type Explained",
            metaDescription: "Learn what a long shot is in filmmaking and how wide framing establishes characters and environments."
        },
        {
            key: "glossary/m/match-cut/",
            metaTitle: "What Is a Match Cut? Editing Technique Explained",
            metaDescription: "Discover what a match cut is in film editing and how editors connect scenes through visual continuity."
        },
        {
            key: "glossary/m/medium-shot/",
            metaTitle: "What Is a Medium Shot? Film Framing Explained",
            metaDescription: "Learn what a medium shot is in cinematography and how it balances character emotion with environment."
        },
        {
            key: "glossary/m/mise-en-scene/",
            metaTitle: "What Is Mise-en-Scène? Film Term Explained",
            metaDescription: "Discover what mise-en-scène means in cinema and how visual elements create storytelling and atmosphere."
        },
        {
            key: "glossary/m/montage/",
            metaTitle: "What Is a Montage in Film? Editing Explained",
            metaDescription: "Learn what a montage is in filmmaking and how editors compress time and emotion through fast-cut sequences."
        },
        {
            key: "glossary/n/narrative/",
            metaTitle: "What Is Narrative in Film? Storytelling Explained",
            metaDescription: "Discover what narrative means in cinema and how filmmakers structure stories through plot and character."
        },
        {
            key: "glossary/n/non-diegetic-sound/",
            metaTitle: "What Is Non-Diegetic Sound? Film Audio Explained",
            metaDescription: "Learn what non-diegetic sound means in film and how music and voice-over exist outside the story world."
        },
        {
            key: "glossary/o/over-the-shoulder-shot/",
            metaTitle: "What Is an Over-the-Shoulder Shot? Explained",
            metaDescription: "Discover what an over-the-shoulder shot is and how filmmakers frame conversations between characters."
        },
        {
            key: "glossary/p/pan-shot/",
            metaTitle: "What Is a Pan Shot? Camera Movement Explained",
            metaDescription: "Learn what a pan shot is in filmmaking and how horizontal camera movement guides audience attention."
        },
        {
            key: "glossary/p/post-production/",
            metaTitle: "What Is Post-Production in Film? Explained",
            metaDescription: "Discover what happens during post-production, including editing, sound design, visual effects, and color grading."
        },
        {
            key: "glossary/p/pov-shot/",
            metaTitle: "What Is a POV Shot? Film Technique Explained",
            metaDescription: "Learn what a POV shot is in filmmaking and how point-of-view framing places audiences inside a character’s perspective."
        },
        {
            key: "glossary/p/producer/",
            metaTitle: "What Does a Film Producer Do? Role Explained",
            metaDescription: "Discover what a producer does in filmmaking, from financing and scheduling to overseeing production."
        },
        {
            key: "glossary/r/rack-focus/",
            metaTitle: "What Is Rack Focus? Cinematography Explained",
            metaDescription: "Learn what rack focus means in filmmaking and how shifting focus changes audience attention within a shot."
        },
        {
            key: "glossary/r/resolution/",
            metaTitle: "What Is Resolution in Film? Meaning Explained",
            metaDescription: "Discover what resolution means in filmmaking, including image quality, pixel count, and cinematic formats."
        },
        {
            key: "glossary/r/rough-cut/",
            metaTitle: "What Is a Rough Cut in Film Editing? Explained",
            metaDescription: "Learn what a rough cut is in post-production and how editors assemble the first version of a movie."
        },
        {
            key: "glossary/s/screenplay/",
            metaTitle: "What Is a Screenplay? Film Writing Explained",
            metaDescription: "Discover what a screenplay is in filmmaking and how scripts guide dialogue, scenes, and story structure."
        },
        {
            key: "glossary/s/shot-list/",
            metaTitle: "What Is a Shot List? Film Production Explained",
            metaDescription: "Learn what a shot list is in filmmaking and how directors plan scenes, camera angles, and coverage."
        },
        {
            key: "glossary/s/steadicam/",
            metaTitle: "What Is a Steadicam? Camera Technique Explained",
            metaDescription: "Discover how Steadicam shots work in filmmaking and why stabilised movement creates smooth cinematic visuals."
        },
        {
            key: "glossary/t/take/",
            metaTitle: "What Is a Take in Film Production? Explained",
            metaDescription: "Learn what a take is in filmmaking and how multiple takes help directors capture the best performance."
        },
        {
            key: "glossary/t/three-point-lighting/",
            metaTitle: "What Is Three-Point Lighting? Explained",
            metaDescription: "Discover how three-point lighting works in filmmaking using key light, fill light, and backlight setups."
        },
        {
            key: "glossary/t/tracking-shot/",
            metaTitle: "What Is a Tracking Shot? Film Technique Explained",
            metaDescription: "Learn what a tracking shot is in filmmaking and how moving cameras follow action through a scene."
        },
        {
            key: "glossary/u/underexposure/",
            metaTitle: "What Is Underexposure in Film? Explained",
            metaDescription: "Discover what underexposure means in cinematography and how low light affects image brightness and detail."
        },
        {
            key: "glossary/v/visual-effects/",
            metaTitle: "What Are Visual Effects in Film? VFX Explained",
            metaDescription: "Learn what visual effects are in filmmaking and how VFX artists create digital imagery for movies."
        },
        {
            key: "glossary/v/voice-over/",
            metaTitle: "What Is Voice-Over in Film? Definition Explained",
            metaDescription: "Discover what voice-over means in movies and how narration shapes storytelling and audience perspective."
        },
        {
            key: "glossary/w/wide-shot/",
            metaTitle: "What Is a Wide Shot? Film Framing Explained",
            metaDescription: "Learn what a wide shot is in filmmaking and how it establishes scale, setting, and character positioning."
        },
        {
            key: "glossary/w/wipe/",
            metaTitle: "What Is a Wipe Transition in Film? Explained",
            metaDescription: "Discover what a wipe transition is in editing and how filmmakers move between scenes using directional motion."
        },
        {
            key: "glossary/z/zoom-shot/",
            metaTitle: "What Is a Zoom Shot? Camera Technique Explained",
            metaDescription: "Learn what a zoom shot is in filmmaking and how changing focal length alters framing and audience focus."
        }]
}