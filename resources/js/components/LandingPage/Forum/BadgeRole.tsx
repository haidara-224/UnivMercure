const RoleBadge = ({ role }: { role: 'student' | 'teacher' | 'admin' }) => {
  const roleConfig = {
    student: { text: 'Étudiant', color: 'bg-blue-500' },
    teacher: { text: 'Enseignant', color: 'bg-amber-500' },
    admin: { text: 'Admin', color: 'bg-red-500' }
  };

  return (
    <span className={`${roleConfig[role].color} text-white text-xs px-2 py-1 rounded-full`}>
      {roleConfig[role].text}
    </span>
  );
};
export default RoleBadge
