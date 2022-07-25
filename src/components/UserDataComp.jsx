import React, { useEffect, useState } from "react";

const UserDataComp = (props) => {
    const [Completed, setCompleted] = useState(true);
    const [showData, setshowData] = useState(false);

    const [updateUserData, setUpdateUserData] = useState({
        id: props.user.id,
        name: props.user.name,
        email: props.user.email,
        address: {
            city: props.user.address.city,
            street: props.user.address.street,
            zipcode: props.user.address.zipcode,
        },
    });

    useEffect(() => {
        const checkCompleted = () => {
            props.todos.map((i) => {
                return i.completed === false && setCompleted(false);
            });
        };
        checkCompleted();
    }, [props.todos]);

    const toggleOtherData = () => {
        setshowData(!showData);
    };

    const prepareUserDataUpdate = (field, e) => {
        if (field === "name" || field === "email") {
            setUpdateUserData({ ...updateUserData, [field]: e.target.value });
        } else {
            setUpdateUserData({
                ...updateUserData,
                address: { ...updateUserData.address, [field]: e.target.value },
            });
        }
    };

    const sendUserDataUpdate = () => {
        props.handleUserChanges(updateUserData);
    };
    const deleteUser = (e, index) => {
        props.handleUserDelete(e, index);
    };
    const sendHandleShowUserTodosAndPosts = (index, id) => {
        props.handleShowUserTodosAndPosts(index, id);
    };

    return (
        <div
            className={
                Completed ? "userBox completedTodosUser" : "userBox notCompletedTodosUser"
            }
            style={
                props.isClicked === true && props.id === props.whichUserID
                    ? { background: "#efb193" }
                    : { background: "transparent" }
            }
        >
            <p
                className="userDataCompID"
                onClick={() =>
                    sendHandleShowUserTodosAndPosts(props.index, props.id)
                }
            >
                ID: {props.id} - Show Posts & Todos
            </p>
            <p>
                Name:{" "}
                <input
                    type="text"
                    name="name"
                    id="userName"
                    defaultValue={props.user.name}
                    onChange={(e) => prepareUserDataUpdate(e.target.name, e)}
                />
            </p>
            <p>
                Email:{" "}
                <input
                    type="text"
                    name="email"
                    id="userEmail"
                    defaultValue={props.user.email}
                    onChange={(e) => prepareUserDataUpdate(e.target.name, e)}
                />
            </p>
            <div
                className={
                    showData ? "buttons shownData" : "buttons notShownData"
                }
            >
                <div className="otherDataButton">
                    <button onClick={toggleOtherData}>Other Data</button>
                    {showData && (
                        <div>
                            City:{" "}
                            <input
                                type="text"
                                name="city"
                                id="city"
                                defaultValue={props.user.address.city}
                                onChange={(e) =>
                                    prepareUserDataUpdate(e.target.name, e)
                                }
                            />
                            Street:{" "}
                            <input
                                type="text"
                                name="street"
                                id="street"
                                defaultValue={props.user.address.street}
                                onChange={(e) =>
                                    prepareUserDataUpdate(e.target.name, e)
                                }
                            />
                            Zip Code:{" "}
                            <input
                                type="text"
                                name="zipCode"
                                id="zipCode"
                                defaultValue={props.user.address.zipcode}
                                onChange={(e) =>
                                    prepareUserDataUpdate(e.target.name, e)
                                }
                            />
                        </div>
                    )}
                </div>
                <button onClick={sendUserDataUpdate}>Update</button>
                <button onClick={(e) => deleteUser(e, props.index)}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default UserDataComp;
