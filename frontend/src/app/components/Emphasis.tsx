interface EmphasisProps {
  children: React.ReactNode;
}

const Emphasis: React.FC<EmphasisProps> = ({ children }) => {
  return (
    <em className="bg-gradient-to-r from-teal-100 to-indigo-100 rounded m-px px-2 py-1 not-italic">{children}</em>
  );
};
  
export default Emphasis;