import React, { useEffect, useRef, useState, useCallback } from "react";

import "./Dropdown.css";
import { ArrowDownIcon, ArrowUpIcon, CloseIcon } from "./Icons";

const Dropdown = ({
  placeHolder,
  menuItems,
  isMulti,
  onChange,
  isLoading,
  error,
  hasMore,
  setPageNum,
  closeOnOutsideClick = true,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState(isMulti ? [] : null);

  const handleInputClick = () => {
    setShowMenu(!showMenu);
  };

  // handle opening / closing dropdown menu
  const labelRef = useRef();
  const dropdownMenuRef = useRef();
  useEffect(() => {
    if (closeOnOutsideClick) {
      const handler = (e) => {
        // If this is a multi select dropdown menu, we don't close
        // the dropdown menu when we click on a dropdown menu item
        if (
          isMulti &&
          labelRef.current &&
          !labelRef.current.contains(e.target) &&
          dropdownMenuRef.current &&
          !dropdownMenuRef.current.contains(e.target)
        ) {
          setShowMenu(false);
        } else if (
          !isMulti &&
          labelRef.current &&
          !labelRef.current.contains(e.target)
        ) {
          setShowMenu(false);
        }
      };

      window.addEventListener("click", handler);
      return () => {
        window.removeEventListener("click", handler);
      };
    }
  });

  const isSelected = (menuItem) => {
    if (isMulti) {
      return (
        selectedValue.filter((item) => item.value === menuItem.value).length > 0
      );
    }
    if (!selectedValue) {
      return false;
    }

    return selectedValue.value === menuItem.value;
  };

  const getLabel = () => {
    if (!selectedValue || selectedValue.length === 0) {
      return placeHolder;
    }
    if (isMulti) {
      return (
        <div className="dropdown-chips-wrapper">
          {selectedValue.map((menuItem) => (
            <div key={menuItem.value} className="dropdown-chip">
              {menuItem.label}
            </div>
          ))}
        </div>
      );
    }
    return selectedValue.label;
  };

  const onMenuItemClick = (menuItem) => {
    let newValue;
    if (isMulti) {
      if (
        selectedValue.findIndex((item) => item.value === menuItem.value) >= 0
      ) {
        newValue = selectedValue.filter(
          (item) => item.value !== menuItem.value
        );
      } else {
        newValue = [...selectedValue, menuItem];
      }
    } else {
      newValue = menuItem;
    }
    setSelectedValue(newValue);
    onChange(newValue);
  };

  // infinite scroll
  const observer = useRef();
  const lastBookElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNum((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, setPageNum]
  );

  const getMenuItem = (menuItem) => {
    return (
      <div
        onClick={() => onMenuItemClick(menuItem)}
        key={menuItem.value}
        className={`dropdown-item ${isSelected(menuItem) && "selected"}`}
      >
        {isMulti && (
          <input type="checkbox" checked={isSelected(menuItem)} readOnly />
        )}
        {menuItem.label}
      </div>
    );
  };

  return (
    <div className="dropdown-container">
      <div ref={labelRef} onClick={handleInputClick} className="dropdown-label">
        <div className="dropdown-selected-value">{getLabel()}</div>
        {selectedValue && selectedValue.length !== 0 ? (
          <div
            onClick={() => {
              isMulti ? setSelectedValue([]) : setSelectedValue(null);
            }}
          >
            <CloseIcon />
          </div>
        ) : showMenu ? (
          <ArrowUpIcon />
        ) : (
          <ArrowDownIcon />
        )}
      </div>
      {showMenu && (
        <div ref={dropdownMenuRef} className="dropdown-menu">
          {menuItems.map((menuItem, i) => {
            // give ref to only the last menu item
            if (menuItems?.length === i + 1) {
              return (
                <div ref={lastBookElementRef} key={menuItem.label}>
                  {getMenuItem(menuItem)}
                </div>
              );
            } else {
              return getMenuItem(menuItem);
            }
          })}
          <div>{isLoading && "Loading..."}</div>
          <div>{error && "Error..."}</div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
