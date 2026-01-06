import React, { useRef, useState, useEffect } from 'react';

type Direction = 'row' | 'column';
interface SplitProps {
    children: React.ReactNode;
    direction?: Direction;
    min?: number;
    max?: number;
    initial?: number;
}
const Split: React.FC<SplitProps> = ({
    children,
    direction = 'row',
    min = 10,
    max = 90,
    initial = 50,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const dragging = useRef(false);
    const frame = useRef<number | null>(null);
    const sizeRef = useRef(initial);
    const [size, setSize] = useState(initial);
    const isRow = direction === 'row';
    const [first, second] = React.Children.toArray(children);
    const updateSize = (clientX: number, clientY: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        let percent = isRow
            ? ((clientX - rect.left) / rect.width) * 100
            : ((clientY - rect.top) / rect.height) * 100;
        percent = Math.max(min, Math.min(max, percent));
        sizeRef.current = percent;
        if (frame.current == null) {
            frame.current = requestAnimationFrame(() => {
                setSize(sizeRef.current);
                frame.current = null;
            });
        }
    };
    const onMouseMove = (e: MouseEvent | TouchEvent) => {
        if (!dragging.current) return;

        let clientX, clientY;
        if ('touches' in e) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = (e as MouseEvent).clientX;
            clientY = (e as MouseEvent).clientY;
        }

        updateSize(clientX, clientY);
    };
    const stopDrag = () => {
        dragging.current = false;
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
        document.body.style.touchAction = ''; // Restore touch action
        window.removeEventListener('mousemove', onMouseMove as any);
        window.removeEventListener('mouseup', stopDrag);
        window.removeEventListener('touchmove', onMouseMove as any);
        window.removeEventListener('touchend', stopDrag);
    };
    const startDrag = () => {
        dragging.current = true;
        document.body.style.userSelect = 'none';
        document.body.style.touchAction = 'none'; // Prevent scrolling while dragging
        window.addEventListener('mousemove', onMouseMove as any);
        window.addEventListener('mouseup', stopDrag);
        window.addEventListener('touchmove', onMouseMove as any, {
            passive: false,
        });
        window.addEventListener('touchend', stopDrag);
    };
    useEffect(() => {
        return () => {
            if (frame.current) cancelAnimationFrame(frame.current);
            window.removeEventListener('mousemove', onMouseMove as any);
            window.removeEventListener('mouseup', stopDrag);
            window.removeEventListener('touchmove', onMouseMove as any);
            window.removeEventListener('touchend', stopDrag);
        };
    }, []);
    return (
        <div
            ref={containerRef}
            className={`flex w-full h-full ${isRow ? 'flex-row' : 'flex-col'}`}
        >
            <div
                style={{
                    flexBasis: `${size}%`,
                    flexShrink: 0,
                    overflow: 'auto',
                }}
            >
                {first}
            </div>
            <div
                onMouseDown={startDrag}
                onTouchStart={startDrag}
                className={`flex justify-evenly items-center bg-(--bg-activity-bar) hover:bg-(--accent-color) transition-colors ${
                    isRow
                        ? 'w-1.5 h-full cursor-col-resize user-select-none'
                        : 'w-full h-1.5 cursor-row-resize flex flex-col user-select-none'
                }`}
            >
                <div
                    className={`bg-(--text-secondary) opacity-50 w-[min(30%,20px)] h-[min(30%,20px)] rounded-full ${
                        isRow ? 'w-0.5 h-8' : 'h-0.5 w-8'
                    }`}
                ></div>
            </div>
            <div style={{ flex: 1, overflow: 'auto' }}>{second}</div>
        </div>
    );
};
export default Split;
