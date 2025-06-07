"use client";
import AppContainer from "@/app/components/atoms/AppContainer/AppContainer";
import AppToolbarDashboard from "@/app/components/molecules/AppToolbarDashboard/AppToolbarDashboard";
import AppCardTitle from "@/app/components/organisms/AppCardTitle/AppCardTitle";
import AppSortableList from "@/app/components/organisms/AppSortableList/AppSortableList";
import AppToolbar from "@/app/components/molecules/AppToolbar/AppToolbar";
import AppContentView from "@/app/components/templates/AppContentView/AppContentView";
import AppSideBarList from "@/app/components/organisms/AppSideBarList/AppSideBarList";
import AppNoteTitleCreate from "@/app/components/organisms/AppNoteTitleCreate/AppNoteTitleCreate";
import AppContentCreate from "@/app/components/templates/AppContentCreate/AppContentCreate";
import AppModalEditTitle from "@/app/components/organisms/AppModalEditTittle/AppModalEditTitle";
import * as noteRepository from "@/app/api/repository/noteRepository";
import * as userRepository from "@/app/api/repository/userRepository";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Notes, Users } from "@/app/utils/types";
import { convertDateString } from "@/app/utils/helper";
import React, { useEffect, useState } from "react";
import { setNoteId } from "@/app/redux/slices/noteSlices";

const DashboardView: React.FC = () => {
    const dispatch = useDispatch();
    const [selectAll, setSelectAll] = useState<boolean>(false);
    const [user, setUser] = useState<Users>({} as Users);
    const [notes, setNotes] = useState<Notes[]>([]);
    const [blockCreated, setBlockCreated] = useState<boolean>(false);
    const [currentNotes, setCurrentNotes] = useState<Notes[]>([]);
    const [selectedNoteIds, setSelectedNoteIds] = useState<number[]>([]);
    const [noteIdData, setNoteIdData] = useState<number>(0);
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [modalEdit, setModalEdit] = useState<boolean>(false);
    const [showContent, setShowContent] = useState<boolean>(false);
    const [showContentCreate, setShowContentCreate] = useState<boolean>(false);
    const [showNoteTitleCreate, setShowNoteTitleCreate] =
        useState<boolean>(false);
    const [activeCheck, setActiveCheck] = useState<boolean>(false);

    const { control, watch } = useForm({});
    const searchValue = watch("search");
    const {
        control: controlNoteEditTitle,
        handleSubmit: handleNoteEditTitleSubmit,
        setValue: setNoteEditTitleValue,
    } = useForm<{ noteEditTitle: string }>();

    const { control: controlNoteTitle, handleSubmit: handleNoteTitle } =
        useForm<{ noteTitle: string }>({
            defaultValues: {
                noteTitle: "",
            },
        });

    const getUser = async () => {
        try {
            const res = await userRepository.getUser();
            if (res.status === "OK") {
                setUser(res.data);
            } else {
                toast.error(res.message || "Failed to fetch user data.");
            }
        } catch (error) {
            toast.error("Failed to fetch user data.");
        }
    };

    const handleNoteCreate = async (data: { noteTitle: string }) => {
        try {
            const payload = {
                title: data.noteTitle,
            };
            const res = await noteRepository.createNote(payload as Notes);

            if (res.status == "OK") {
                toast.success("Note title created successfully");
                setShowNoteTitleCreate(false);
                handleNoteList();
            } else {
                toast.error(res.message || "Failed to create note title");
            }
        } catch (error) {
            toast.error("Failed to create note title");
        }
    };

    const handleNoteUpdate = async (data: { noteEditTitle: string }) => {
        try {
            const payload = {
                title: data.noteEditTitle,
            };
            const res = await noteRepository.updateNote(
                noteIdData,
                payload as Notes
            );
            if (res.status == "OK") {
                toast.success("Note title updated successfully");
                setModalEdit(false);
                handleNoteList();
            } else {
                toast.error(res.message || "Failed to update note title");
            }
        } catch (error) {
            toast.error("Failed to update note title");
        }
    };
    const handleNoteAllUpdate = async (data: Notes[]) => {
        try {
            data.forEach(async (note) => {
                const payload = { title: note.title };

                const res = await noteRepository.updateNote(
                    note.id as number,
                    payload as Notes
                );
                if (res.status == "OK") {
                    handleNoteList();
                } else {
                    toast.error(res.message || "Fail ed to update note title");
                }
            });
        } catch (error) {
            toast.error("Failed to update note title");
        }
    };

    const handleNoteDelete = async (id: number) => {
        try {
            const res = await noteRepository.deleteNote(id);
            if (res.status == "OK") {
                toast.success("Note deleted successfully");
                handleNoteList();
            } else {
                toast.error(res.message || "Failed to delete note");
            }
        } catch (error) {
            toast.error("Failed to delete note");
        }
    };

    const handleNoteDeleteSelected = async () => {
        if (selectedNoteIds.length === 0) {
            toast.error("No notes selected for deletion");
            return;
        }

        try {
            const promises = selectedNoteIds.map((id) =>
                noteRepository.deleteNote(id)
            );
            const results = await Promise.all(promises);

            const failedDeletes = results.filter((res) => res.status !== "OK");

            if (failedDeletes.length > 0) {
                setActiveCheck(false);
                toast.error(`Failed to delete ${failedDeletes.length} notes`);
            } else {
                toast.success("Selected notes deleted successfully");
                handleNoteList();
                setSelectedNoteIds([]);
                setSelectAll(false);
            }
        } catch (error) {
            toast.error("Failed to delete selected notes");
        }
    };

    const handleNoteList = async () => {
        try {
            const res = await noteRepository.readNotes();
            if (res.status == "OK") {
                setNotes(res.data);
                setCurrentNotes(res.data);
            } else {
                toast.error(res.message || "Failed to fetch notes");
            }
        } catch (error) {
            toast.error("Failed to fetch notes");
        }
    };

    const handleNoteClick = (id: number) => {
        dispatch(setNoteId(id));

        const noteFilter = notes.filter((data) => {
            return data.id === id;
        });

        noteFilter[0]?.blocks?.length == 0
            ? setShowContentCreate(true)
            : setShowContent(true);
    };

    const handleNoteSelected = (value: boolean, noteId: number) => {
        if (value) {
            setSelectedNoteIds((prev) => [...prev, noteId]);
        } else {
            setSelectedNoteIds((prev) => prev.filter((id) => id !== noteId));
        }
    };

    const handleSelectAll = (value: boolean) => {
        setSelectAll(value);
        if (value) {
            setSelectedNoteIds((notes as any).map((note: any) => note.id));
        } else {
            setSelectedNoteIds([]);
        }
    };

    const handleNoteSearch = (searchTerm: string) => {
        if (!searchTerm) {
            setNotes(currentNotes);
            return;
        }

        const filteredNotes = currentNotes.filter((note) =>
            note.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setNotes(filteredNotes);
    };

    useEffect(() => {
        handleNoteList();
    }, []);

    useEffect(() => {
       if (blockCreated) handleNoteList();
    }, [blockCreated]);

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        if (searchValue !== undefined) {
            handleNoteSearch(searchValue);
        }
    }, [searchValue]);

    return (
        <AppContainer className="w-full h-screen flex items-center bg-gray-200 justify-center relative ">
            <AppContainer
                className={`w-[50%] sm:w-[50%] md:w-[30%] lg:w-[20%] xl:w-[12%] h-full  bg-black ${
                    sidebarOpen &&
                    " block sm:block md:block lg:block left-0 z-20 absolute sm:absolute md:absolute lg:absolute"
                }  ${
                    !sidebarOpen && " hidden sm:hidden md:hidden lg:hidden"
                } xl:block`}
            >
                <AppSideBarList />
            </AppContainer>
            <AppContainer
                onClick={() => setSidebarOpen(false)}
                className="w-full sm:w-full md:w-full lg:w-full xl:w-[88%] h-full flex flex-col p-[20px] gap-[20px]"
            >
                {showContent && (
                    <AppContentView onClick={() => setShowContent(false)} />
                )}
                {showContentCreate && (
                    <AppContentCreate
                        onClick={() => setShowContentCreate(false)}
                        onCreated={(value) => {
                            setBlockCreated(value)
                            if (value) {
                                setShowContentCreate(false);
                                setShowContent(true);
                            }         
                        }}
                    />
                )}
                {!showContent && !showContentCreate && (
                    <>
                        <AppToolbarDashboard
                            control={control}
                            titleProfile={user.name || "User"}
                            onClickSidebar={() => {
                                setSidebarOpen(true);
                                console.log("adssadsa");
                            }}
                        />

                        <AppContainer className="w-full h-full p-[20px] rounded-2xl flex flex-col items-start gap-[20px] overflow-y-auto overflow-x-hidden bg-white">
                            <AppToolbar
                                onChange={(event) =>
                                    handleSelectAll(event.target.checked)
                                }
                                onChecked={(value) => setActiveCheck(value)}
                                onDelete={handleNoteDeleteSelected}
                                onClick={() => setShowNoteTitleCreate(true)}
                            />

                            {/*  */}
                            {showNoteTitleCreate && (
                                <AppNoteTitleCreate
                                    control={controlNoteTitle}
                                    onCancel={() =>
                                        setShowNoteTitleCreate(false)
                                    }
                                    onAdd={handleNoteTitle(handleNoteCreate)}
                                />
                            )}

                            <AppSortableList
                                items={notes}
                                onChange={(notes) => {
                                    setNotes([...notes]);
                                    handleNoteAllUpdate(notes);
                                }}
                                getId={(note) => note?.id?.toString() || ""}
                                renderItem={(note) => (
                                    <AppCardTitle
                                        isChecked={activeCheck}
                                        checked={selectedNoteIds.includes(
                                            note?.id || 0
                                        )}
                                        title={note.title}
                                        createdAt={
                                            convertDateString(
                                                note?.updatedAt || ""
                                            ) || ""
                                        }
                                        username={note.user?.name || ""}
                                        onDetail={() =>
                                            handleNoteClick(note.id || 0)
                                        }
                                        onEdit={() => {
                                            setModalEdit(true);
                                            setNoteIdData(note.id as number);
                                            setNoteEditTitleValue(
                                                "noteEditTitle",
                                                note.title
                                            );
                                        }}
                                        onDelete={() =>
                                            handleNoteDelete(note.id || 0)
                                        }
                                        onCheck={(event) =>
                                            handleNoteSelected(
                                                event.target.checked,
                                                note.id || 0
                                            )
                                        }
                                    />
                                )}
                            />
                        </AppContainer>
                    </>
                )}
            </AppContainer>
            <AppModalEditTitle
                open={modalEdit}
                control={controlNoteEditTitle}
                onClose={() => setModalEdit(false)}
                onEdit={handleNoteEditTitleSubmit(handleNoteUpdate)}
            />
        </AppContainer>
    );
};

export default DashboardView;
