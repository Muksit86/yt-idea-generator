import { useEffect, useState } from "react";
import main from "./Ai/Ai.js";
import IdeaBoard from "./component/IdeaBoard";
import InputFeild from "./component/InputFeilds";

function App() {
  useEffect(() => {
    const old_ideas = localStorage.getItem("ideas");
    if (old_ideas) {
      try {
        setIdeas(JSON.parse(old_ideas));
      } catch {
        setIdeas([]);
      }
    }
  }, []);

  const [ideas, setIdeas] = useState([]);

  const [selectedTone, setSelectedTone] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [topic, setTopic] = useState("");

  const [loading, setLoading] = useState(false);
  const [disabled, setDisables] = useState(false);

  const saveToMemory = (ideaList) => {
    localStorage.setItem("ideas", JSON.stringify(ideaList));
  };

  const generateIdeas = async (e) => {
    setDisables(true);
    const prompt = `You are a creative AI. Generate exactly 4 unique and engaging YouTube video ideas based on the tone and topic provided. The category is always YouTube Video Ideas. Do not include any explanations or additional text — only output the 4 video titles.

    Tone: ${selectedTone}
    Topic: ${topic}
    Category: ${selectedCategory}

    Output format:
    1. [First video idea]
    2. [Second video idea]
    3. [Third video idea]
    4. [Fourth video idea]
    `;

    const response = await main(prompt);
    const responseIdeas = response.text.split("\n");
    setIdeas((prevIdeas) => responseIdeas);
    setDisables(false);
    saveToMemory(responseIdeas);
  };

  return (
    <>
<div className="flex flex-col h-screen p-4">
  {/* Header */}
  <header className="shrink-0">
    <h1 className="text-lg font-semibold text-center text-black leading-tight">
      YOUTUBE IDEA GENERATOR
    </h1>
    <p className="text-sm text-center text-gray-700 mt-1">
      Generate youtube ideas with AI
    </p>
  </header>

  {/* Main Content Area - scrollable */}
  <main className="flex-1 overflow-y-auto mt-4 space-y-6">
    <div>
      <InputFeild
        selectedTone={selectedTone}
        setSelectedTone={setSelectedTone}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        topic={topic}
        setTopic={setTopic}
        generateIdeas={generateIdeas}
        loading={loading}
        setLoading={setLoading}
        disabled={disabled}
      />
    </div>

    <div className="max-h-[50vh] overflow-y-auto">
      <IdeaBoard loading={loading} ideas={ideas} />
    </div>
  </main>

  {/* Footer */}
  <footer className="shrink-0 mt-2">
    <p className="text-xs text-center text-black">
      only new ideas will be stored in localStorage
    </p>
  </footer>
</div>


    </>
  );
}

export default App;
