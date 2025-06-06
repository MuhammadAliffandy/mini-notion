"use client";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
import { Icon } from "@iconify/react";

interface AppSortableListProps<T> {
    items: T[];
    onChange: (items: T[]) => void;
    renderItem?: (item: T) => React.ReactNode;
    getId: (item: T) => string;
}

interface SortableItemProps {
    id: string;
    children: React.ReactNode;
}

function SortableItem({ id, children }: SortableItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="w-full flex gap-[12px] items-center"
            {...attributes}
        >
            <div {...listeners} className="w-max cursor-grab p-2">
                <Icon
                    icon="lsicon:drag-outline"
                    className="text-gray-500 text-[32px] md:text-[24px]"
                />
            </div>

            <div className="w-full">{children}</div>
        </div>
    );
}

function AppSortableList<T>({
    items,
    onChange,
    renderItem,
    getId,
}: AppSortableListProps<T>) {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor),
        useSensor(TouchSensor)
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = items.findIndex(
                (item) => getId(item) === active.id
            );
            const newIndex = items.findIndex((item) => getId(item) === over.id);
            const newItems = arrayMove(items, oldIndex, newIndex);
            onChange(newItems);
        }
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={items.map(getId)}
                strategy={verticalListSortingStrategy}
            >
                {items.map((item) => (
                    <SortableItem key={getId(item)} id={getId(item)}>
                        {renderItem ? renderItem(item) : getId(item)}
                    </SortableItem>
                ))}
            </SortableContext>
        </DndContext>
    );
}

export default AppSortableList;
