import openModal from "../scripts/modals.js"

const editButton = document.querySelector("#edit")

const editUser = async () => {
    const user = await userProfileInfo()

    editButton.addEventListener("click", async () => {
        const userEdit = editProfile()
        openModal(userEdit)
    })
}