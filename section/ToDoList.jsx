"use client";

import { Input } from "@/components/ui/input";
import React, { useState, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { JenisTask } from "@/constants";
import DeleteConfirmation from "@/components/shared/DeleteConfirmation";
import { Button } from "@/components/ui/button";

const ToDoList = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [taskList, setTaskList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "" && selectedTask) {
      const selectedColor = JenisTask.find(
        (task) => task.id === selectedTask
      ).color;
      const newTask = { text: inputValue, color: selectedColor };
      setTaskList([...taskList, newTask]);
      setInputValue("");
      localStorage.setItem("taskList", JSON.stringify([...taskList, newTask]));
    }
    
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  useEffect(() => {
    const storedTaskList = JSON.parse(localStorage.getItem("taskList"));
    if (storedTaskList) {
      setTaskList(storedTaskList);
    }
  }, []);

  const handleDelete = (index) => {
    const newTaskList = [...taskList];
    newTaskList.splice(index, 1);
    setTaskList(newTaskList); 
    localStorage.setItem("taskList", JSON.stringify(newTaskList)); 
  };

  const handleClear = () => {
    setTaskList([]);
    localStorage.removeItem("taskList");
  };

  return (
    <section className="w-full">
      <form
        onSubmit={handleSubmit}
        className="wrapper gradient-color1 rounded-lg shadow-xl flex items-center gap-4"
      >
        <RadioGroup
          className="flex flex-row gap-2"
          value={selectedTask}
          onValueChange={setSelectedTask}
        >
          {JenisTask.map((item) => (
            <div key={item.id} className="flex items-center">
              <RadioGroupItem
                value={item.id}
                id={item.id}
                style={{
                  backgroundColor:
                    selectedTask === item.id ? item.color : "transparent",
                }}
              />
              <Label htmlFor={item.id} className="text-white ml-2">
                {item.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
        <Input
          type="text"
          placeholder="Add new task"
          className="input-field"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <div className="w-32">
          <Button
            type="submit"
            onClick={handleSubmit}
            className="flex-center p-16-semibold whitespace-nowrap rounded-2xl bg-cover transition-all hover:bg-purple-100 hover:shadow-inner bg-white sidebar-link text-purple-700 w-32"
          >
            Add Task
          </Button>
        </div>
      </form>
      <div className="wrapper   flex-col items-center gap-4 mt-12">
        {taskList.map((task) => (
          <div
            key={task.id} 
            className="flex flex-row gap-12 gradient-color1 p-2 rounded-xl shadow-lg mt-4 justify-between items-center"
          >
            <div
              style={{ backgroundColor: task.color }}
              className="h-5 w-5 rounded-full"
            ></div>
            <Label className="p-18-semibold text-white">{task.text} </Label>
            <div className="flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
              <DeleteConfirmation onDelete={() => handleDelete(task.id)} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center w-full">
        <Button
          onClick={handleClear}
          className="flex-center p-16-semibold whitespace-nowrap bg-purple-gradient rounded-2xl bg-cover transition-all hover:bg-purple-100 hover:shadow-inner bg-white  text-purple-700 w-32"
        >
          Clear all
        </Button>
      </div>
    </section>
  );
};

export default ToDoList;
