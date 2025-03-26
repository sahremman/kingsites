import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  fetchClassrooms, 
  createClassroom, 
  updateClassroom, 
  deleteClassroom 
} from '../services/classroomService';

const ClassroomManagement = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [newClassroom, setNewClassroom] = useState({
    name: '',
    subject: '',
    description: ''
  });

  useEffect(() => {
    const loadClassrooms = async () => {
      try {
        const data = await fetchClassrooms();
        setClassrooms(data);
      } catch (error) {
        console.error('Failed to load classrooms', error);
      }
    };

    loadClassrooms();
  }, []);

  const handleCreateClassroom = async () => {
    try {
      const createdClassroom = await createClassroom(newClassroom);
      setClassrooms([...classrooms, createdClassroom]);
      setNewClassroom({ name: '', subject: '', description: '' });
    } catch (error) {
      console.error('Failed to create classroom', error);
    }
  };

  const handleDeleteClassroom = async (classroomId) => {
    try {
      await deleteClassroom(classroomId);
      setClassrooms(classrooms.filter(c => c.id !== classroomId));
    } catch (error) {
      console.error('Failed to delete classroom', error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Classroom Management</h1>

      <Dialog>
        <DialogTrigger asChild>
          <Button>Create New Classroom</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Classroom</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input 
              placeholder="Classroom Name"
              value={newClassroom.name}
              onChange={(e) => setNewClassroom({
                ...newClassroom, 
                name: e.target.value
              })}
            />
            <Input 
              placeholder="Subject"
              value={newClassroom.subject}
              onChange={(e) => setNewClassroom({
                ...newClassroom, 
                subject: e.target.value
              })}
            />
            <Input 
              placeholder="Description"
              value={newClassroom.description}
              onChange={(e) => setNewClassroom({
                ...newClassroom, 
                description: e.target.value
              })}
            />
            <Button onClick={handleCreateClassroom}>
              Save Classroom
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-3 gap-6">
        {classrooms.map(classroom => (
          <div key={classroom.id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{classroom.name}</h2>
            <p>{classroom.subject}</p>
            <p>{classroom.description}</p>
            <div className="flex space-x-2 mt-4">
              <Button variant="destructive" 
                onClick={() => handleDeleteClassroom(classroom.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassroomManagement;
