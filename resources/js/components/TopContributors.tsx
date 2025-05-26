const TopContributors = () => {
    return (
        <div className="flex flex-col items-start justify-start gap-4">
            <div className="flex items-center justify-between self-stretch">
                <div className="text-sm leading-none font-semibold text-gray-800 capitalize">עוזרים מובילים</div>
                <a className="touchable-opacity" href="/leaderboard">
                    <p className="text-xs leading-3 font-medium text-gray-400 no-underline">הצגת הכל</p>
                </a>
            </div>
            <ul className="flex flex-col items-start justify-start gap-5 self-stretch">
                <li className="flex items-center justify-between self-stretch">
                    <a className="touchable-opacity flex items-center gap-2" href="/@Interstarix">
                        <div className="relative">
                            <span className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full">
                                <img
                                    className="aspect-square h-full w-full object-cover"
                                    src="https://helpbank-spaces-1.ams3.cdn.digitaloceanspaces.com/profile-photos/EubDZNuuV6XUZNRJqbPVOhweMjOeXv906Vn3wWtR.png"
                                    alt="Interstarix"
                                />
                            </span>
                            <div className="absolute -bottom-0.5 -left-0.5 h-2/5 w-2/5" data-state="closed">
                                <div className="relative h-full w-full">
                                    <div className="absolute top-[25%] right-[25%] h-3/6 w-3/6 bg-white"></div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        aria-hidden="true"
                                        data-slot="icon"
                                        className="absolute h-full w-full text-teal-500"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-start justify-start gap-0.5">
                            <div className="flex flex-row items-center gap-x-2">
                                <span className="text-xs font-medium text-gray-800">אושר גיימינג 💟</span>
                            </div>
                            <span className="text-xs font-normal text-gray-400">@Interstarix</span>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default TopContributors;
