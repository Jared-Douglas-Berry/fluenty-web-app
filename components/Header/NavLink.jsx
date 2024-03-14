import Link from "next/link";
import styles from "./NavLink.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

function NavLink({ hrefActive, href, children }) {
    const path = usePathname();
    const router = useRouter();
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const handleIntersection = (entries) => {
            entries.forEach(entry => {
                setIsActive(entry.isIntersecting);
            });
        };

        const target = document.querySelector(hrefActive);
        const observer = new IntersectionObserver(handleIntersection, {
            root: null,
            rootMargin: '0px',
            threshold: 0.5,
        });

        // Function to check intersection status
        const checkIntersection = () => {
            if (target) {
                setIsActive(target.isIntersecting);
            }
        };

        // Check intersection when the route changes
        const handleRouteChange = () => {
            checkIntersection();
        };

        // Initial check when component mounts
        checkIntersection();

        // Observe target element
        if (target) {
            observer.observe(target);
        }

        // Clean up observer
        return () => {
            if (target) {
                setIsActive(false);
                observer.unobserve(target);
            }
        };
    }, [hrefActive, router.asPath]); // Listen for route changes

    return (
        <Link
            href={href}
            className={`${styles.link} ${isActive || path.startsWith(href) ? styles.active : ''}`}
        >
            {children}
        </Link>
    );
}

export default NavLink;