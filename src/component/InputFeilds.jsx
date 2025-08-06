import { useState } from "react";

function InputFeild({
  generateIdeas,
  selectedTone,
  setSelectedTone,
  selectedCategory,
  setSelectedCategory,
  topic,
  setTopic,
  loading,
  setLoading,
  disabled
}) {
  const [tones, setTones] = useState([
    "Conversational",
    "Humorous",
    "Energetic",
    "Informative",
    "Professional",
    "Sarcastic",
    "Empathetic",
    "Playful",
    "Narrative",
    "Analytical",
    "Dramatic",
    "Relaxed",
  ]);

  const [categorys, setCategorys] = useState([
    "Gaming",
    "Vlogging",
    "Art & DIY",
    "Food & Cooking",
    "Education & Learning",
    "Music & Audio",
    "Fitness & Health",
    "Fashion & Beauty",
    "Entertainment & Commentary",
    "Business & Finance",
    "Science & Tech",
    "Travel & Exploration",
    "Home & Family",
    "Self-Improvement & Productivity",
    "Pets & Animals",
    "Niche & Hobby Channels",
    "Documentary",
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await generateIdeas();
    setLoading(false);
  };

  return (
    <>
      <form className="w-12/12 flex flex-col items-center justify-center gap-4">
        <select
          value={selectedTone}
          onChange={(e) => setSelectedTone(e.target.value)}
          className="w-full select bg-white text-xl text-black h-12 shadow-sm"
        >
          <option value="" disabled>
            Pick a tone
          </option>
          {tones.map((tone, index) => (
            <option key={tone} value={tone}>
              {tone}
            </option>
          ))}
        </select>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full select bg-white text-xl text-black shadow-sm h-12"
        >
          <option value="" disabled>
            Channel category
          </option>
          {categorys.map((category, index) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <textarea
          className="textarea w-full border-gray-300 shadow-sm text-xl h-25 bg-white text-black"
          placeholder="Write 1-2 lines about the topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          type="submit"
          className="w-full btn btn-info text-xl text-white font-thing py-6 shadow-sm"
          disabled={disabled}
        >
          Generate
          {loading ? (
            <span className="loading loading-dots loading-xs"></span>
          ) : (
            ""
          )}
        </button>
      </form>
    </>
  );
}

export default InputFeild;
