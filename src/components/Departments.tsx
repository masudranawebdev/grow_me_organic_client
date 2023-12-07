import React, { useState, useEffect } from "react";
import {
  List,
  ListItemButton,
  ListItemText,
  Checkbox,
  Collapse,
  ListItemIcon,
  Container,
  Typography,
} from "@mui/material";
import { data } from "../data/departmentData";

const Departments: React.FC = () => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[]>([]);

  const handleToggle = (item: string) => () => {
    const newSelected = [...selected];

    // If the clicked item is a department
    if (data.some((department) => department.department === item)) {
      const isDepartmentSelected = newSelected.includes(item);
      const department = data.find((d) => d.department === item);

      if (department) {
        // Toggle selection of the department
        if (!isDepartmentSelected) {
          newSelected.push(item);
        } else {
          const departmentIndex = newSelected.indexOf(item);
          if (departmentIndex !== -1) {
            newSelected.splice(departmentIndex, 1);
          }
        }

        // Toggle selection of all sub-departments
        department.sub_departments.forEach((subDep) => {
          const subDepIndex = newSelected.indexOf(subDep);
          if (!isDepartmentSelected) {
            // Add sub-department if not already present
            if (subDepIndex === -1) {
              newSelected.push(subDep);
            }
          } else {
            // Remove sub-department if present
            if (subDepIndex !== -1) {
              newSelected.splice(subDepIndex, 1);
            }
          }
        });
      }
    } else {
      // If the clicked item is a sub-department
      const department = data.find(
        (department) => department.sub_departments.indexOf(item) !== -1
      );

      if (department) {
        // Toggle selection of the sub-department
        const subDepIndex = newSelected.indexOf(item);
        if (subDepIndex !== -1) {
          newSelected.splice(subDepIndex, 1);
        } else {
          newSelected.push(item);
        }

        // Check if all sub-departments are selected and toggle selection of the department
        const allSubDepartmentsSelected = department.sub_departments.every(
          (subDep) => newSelected.includes(subDep)
        );

        const departmentIndex = newSelected.indexOf(department.department);
        if (allSubDepartmentsSelected && departmentIndex === -1) {
          newSelected.push(department.department);
        } else if (!allSubDepartmentsSelected && departmentIndex !== -1) {
          newSelected.splice(departmentIndex, 1);
        }
      }
    }

    setSelected(newSelected);
  };

  const handleExpand = (item: string) => () => {
    setExpanded((prevExpanded) => (prevExpanded === item ? null : item));
  };

  useEffect(() => {}, [selected]);

  const isSelected = (item: string) => selected.indexOf(item) !== -1;

  return (
    <Container maxWidth="sm" sx={{ marginBottom: "50px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Select Department
      </Typography>
      <List>
        {data.map((department) => (
          <React.Fragment key={department.department}>
            <ListItemButton
              onClick={handleExpand(department.department)}
              selected={isSelected(department.department)}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={isSelected(department.department)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": department.department }}
                  onClick={(event) => {
                    event.stopPropagation();
                    handleToggle(department.department)();
                  }}
                  // onClick={handleToggle(department.department)}
                />
              </ListItemIcon>
              <ListItemText
                primary={
                  department.department +
                  " " +
                  `(${department.sub_departments.length})`
                }
              />
              <span>{}</span>
              {expanded === department.department ? (
                <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                  -
                </span>
              ) : (
                <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                  +
                </span>
              )}
            </ListItemButton>
            <Collapse
              in={expanded === department.department}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {department.sub_departments.map((subDepartment) => (
                  <ListItemButton
                    key={subDepartment}
                    onClick={handleToggle(subDepartment)}
                    selected={isSelected(subDepartment)}
                  >
                    <ListItemIcon sx={{ paddingLeft: 4 }}>
                      <Checkbox
                        edge="start"
                        checked={isSelected(subDepartment)}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{
                          "aria-labelledby": subDepartment,
                        }}
                        onClick={handleToggle(subDepartment)}
                      />
                    </ListItemIcon>
                    <ListItemText primary={subDepartment} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
    </Container>
  );
};

export default Departments;
