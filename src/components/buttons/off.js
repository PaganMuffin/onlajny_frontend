export const ButtonOff = (props) => {
    return (
        <button
            disabled
            class="w-full py-1 text-gray-500 text-center font-semibold text-lg focus:outline-none"
        >
            {props['text']}
        </button>
    )
}