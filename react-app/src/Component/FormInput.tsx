interface Props {
  name: string;
  setName: (name: string) => void;
  color: string;
  setColor: (color: string) => void;
  image: string;
  setImage: (image: string) => void;
  addPlayer: (e: React.FormEvent<HTMLFormElement>) => void;
}
function FormInput({
  name,
  setName,
  color,
  setColor,
  image,
  setImage,
  addPlayer,
}: Props) {
  return (
    <>
      <form onSubmit={addPlayer} className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <h2 className="font-bold">Player Infor</h2>
          <label htmlFor="name">Name: </label>
          <input
            id="name"
            placeholder="Name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            className="border p-1 mb-2 w-full"
          />
          <label htmlFor="color">Color: </label>
          <input
            id="color"
            placeholder="Color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="border p-1 mb-2 w-full"
          />
          <label htmlFor="image">Image URL: </label>
          <input
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="border p-1 mb-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="col-span-2 bg-blue-500 text-white p-2 rounded"
        >
          Add
        </button>
      </form>
    </>
  );
}

export default FormInput;
