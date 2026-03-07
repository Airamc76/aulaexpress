
import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Course } from '../types';
import CourseCard from './CourseCard';

interface CourseCarouselProps {
    courses: Course[];
    onCourseClick: (slug: string) => void;
}

const CourseCarousel: React.FC<CourseCarouselProps> = ({ courses, onCourseClick }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    // Drag state
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);
    const dragDistance = useRef(0);

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setShowLeftArrow(scrollLeft > 10);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        const el = scrollRef.current;
        if (el) {
            el.addEventListener('scroll', checkScroll);
            window.addEventListener('resize', checkScroll);
            checkScroll();
            return () => {
                el.removeEventListener('scroll', checkScroll);
                window.removeEventListener('resize', checkScroll);
            };
        }
    }, [courses]);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = scrollRef.current.clientWidth * 0.8;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    // Mouse drag handlers
    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollRef.current) return;
        isDragging.current = true;
        dragDistance.current = 0;
        startX.current = e.pageX - scrollRef.current.offsetLeft;
        scrollLeft.current = scrollRef.current.scrollLeft;
        scrollRef.current.style.cursor = 'grabbing';
        scrollRef.current.style.scrollSnapType = 'none'; // Disable snap while dragging
    };

    const handleMouseLeave = () => {
        if (!isDragging.current) return;
        isDragging.current = false;
        if (scrollRef.current) {
            scrollRef.current.style.cursor = 'grab';
            scrollRef.current.style.scrollSnapType = 'x mandatory';
        }
    };

    const handleMouseUp = () => {
        if (!isDragging.current) return;
        isDragging.current = false;
        if (scrollRef.current) {
            scrollRef.current.style.cursor = 'grab';
            scrollRef.current.style.scrollSnapType = 'x mandatory';
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging.current || !scrollRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX.current) * 2; // Scroll speed
        scrollRef.current.scrollLeft = scrollLeft.current - walk;
        dragDistance.current = Math.abs(x - startX.current);
    };

    const handleItemClick = (e: React.MouseEvent, slug: string) => {
        // If we dragged more than 10 pixels, it's a drag, not a click
        if (dragDistance.current > 10) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        onCourseClick(slug);
    };

    return (
        <div className="relative group">
            {/* Left Arrow */}
            {showLeftArrow && (
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 bg-white border border-gray-100 shadow-xl p-3 rounded-full hover:bg-indigo-600 hover:text-white transition-all duration-300 hidden md:flex items-center justify-center group-hover:block"
                    aria-label="Anterior"
                >
                    <ChevronLeft className="h-6 w-6" />
                </button>
            )}

            {/* Right Arrow */}
            {showRightArrow && (
                <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-30 bg-white border border-gray-100 shadow-xl p-3 rounded-full hover:bg-indigo-600 hover:text-white transition-all duration-300 hidden md:flex items-center justify-center group-hover:block"
                    aria-label="Siguiente"
                >
                    <ChevronRight className="h-6 w-6" />
                </button>
            )}

            {/* Carousel Container */}
            <div
                ref={scrollRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onDragStart={(e) => e.preventDefault()}
                className="flex overflow-x-auto space-x-6 pb-8 px-4 -mx-4 no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing select-none touch-pan-y"
                style={{
                    scrollSnapType: 'x mandatory',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    WebkitOverflowScrolling: 'touch',
                    WebkitUserSelect: 'none',
                    userSelect: 'none'
                }}
            >
                {courses.map(course => (
                    <div
                        key={course.id}
                        className="min-w-[280px] sm:min-w-[320px] scroll-snap-align-start px-2 pointer-events-auto"
                        onClick={(e) => handleItemClick(e, course.slug)}
                    >
                        <CourseCard
                            course={course}
                            onClick={() => { }}
                        />
                    </div>
                ))}

                {/* CSS for hiding scrollbar */}
                <style dangerouslySetInnerHTML={{
                    __html: `
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .scroll-snap-align-start {
            scroll-snap-align: start;
          }
          .select-none {
            user-select: none;
            -webkit-user-select: none;
          }
        ` }} />
            </div>
        </div>
    );
};

export default CourseCarousel;
