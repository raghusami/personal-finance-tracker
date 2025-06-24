import { useEffect, useState } from "react";
import {
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  ShoppingCartIcon
} from "@heroicons/react/24/outline";
import expenseCategories from "../data/expenseCategories.json";
import PageHeader from "../components/PageHeader";

type CategoryData = {
  category: string;
  subcategories: string[];
};

export default function CategoryManager() {
  const [data, setData] = useState<CategoryData[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalValue, setModalValue] = useState("");
  const [modalOnConfirm, setModalOnConfirm] = useState<(val: string) => void>(() => () => {});

  // Confirm State
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmOnYes, setConfirmOnYes] = useState<() => void>(() => () => {});

  useEffect(() => {
    setData(expenseCategories);
  }, []);

  // 🔄 Modal Trigger with always-up-to-date logic
  const openModal = (
    title: string,
    initialValue: string,
    onConfirm: (value: string) => void
  ) => {
    setModalTitle(title);
    setModalValue(initialValue);
    setModalOnConfirm(() => onConfirm);
    setModalOpen(true);
  };

  const openConfirm = (message: string, onYes: () => void) => {
    setConfirmMessage(message);
    setConfirmOnYes(() => onYes);
    setConfirmOpen(true);
  };

  const handleAddCategory = () => {
    openModal("Add New Category", "", (val) => {
      if (val.trim()) {
        setData([...data, { category: val.trim(), subcategories: [] }]);
      }
    });
  };

  const handleEditCategory = (index: number) => {
    openModal("Edit Category", data[index].category, (val) => {
      const updated = [...data];
      updated[index].category = val.trim();
      setData(updated);
    });
  };

  const handleDeleteCategory = (index: number) => {
    openConfirm("Are you sure you want to delete this category?", () => {
      const updated = [...data];
      updated.splice(index, 1);
      setData(updated);
    });
  };

  const handleAddSubcategory = (catIdx: number) => {
    openModal("Add Subcategory", "", (val) => {
      if (val.trim()) {
        const updated = [...data];
        updated[catIdx].subcategories.push(val.trim());
        setData(updated);
      }
    });
  };

  const handleEditSub = (catIdx: number, subIdx: number) => {
    openModal("Edit Subcategory", data[catIdx].subcategories[subIdx], (val) => {
      const updated = [...data];
      updated[catIdx].subcategories[subIdx] = val.trim();
      setData(updated);
    });
  };

  const handleDeleteSub = (catIdx: number, subIdx: number) => {
    openConfirm("Delete this subcategory?", () => {
      const updated = [...data];
      updated[catIdx].subcategories.splice(subIdx, 1);
      setData(updated);
    });
  };

 return (
  <div className="p-6">
    <PageHeader
      title="Manage Expense Categories"
      icon={<ShoppingCartIcon className="w-6 h-6" />}
      breadcrumb={["Components", "Income", "Expense Categories"]}
    />

    <div className="card bg-base-100 border border-base-200 shadow-sm">
      <div className="card-body">
        {data.map((item, i) => (
          <div key={i} className="mb-1 rounded shadow-sm bg-base-100 border border-base-200">
            <div
              className="flex justify-between items-center p-2 cursor-pointer"
              onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
            >
              <div className="font-medium text-md text-base-content">{item.category}</div>
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddSubcategory(i);
                  }}
                  className="btn btn-xs btn-primary"
                >
                  <PlusIcon className="w-4 h-4 mr-1" /> Sub
                </button>
                <button
                  className="btn btn-xs btn-square btn-outline btn-primary tooltip"
                  data-tip="Edit"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditCategory(i);
                  }}
                >
                  <PencilSquareIcon className="h-4 w-4" />
                </button>
                <button
                  className="btn btn-xs btn-square btn-outline btn-error tooltip"
                  data-tip="Delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteCategory(i);
                  }}
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>

            {expandedIndex === i && (
              <div className="p-4">
                {item.subcategories.length === 0 ? (
                  <p className="text-base-content/60 text-sm">No subcategories added.</p>
                ) : (
                  <ul className="list-disc list-inside space-y-2">
                    {item.subcategories.map((sub, idx) => (
                      <li key={idx} className="flex justify-between items-center">
                        <span>{sub}</span>
                        <div className="flex gap-2">
                          <button
                            className="btn btn-xs btn-square btn-outline btn-primary tooltip"
                            data-tip="Edit"
                            onClick={() => handleEditSub(i, idx)}
                          >
                            <PencilSquareIcon className="h-4 w-4" />
                          </button>
                          <button
                            className="btn btn-xs btn-square btn-outline btn-error tooltip"
                            data-tip="Delete"
                            onClick={() => handleDeleteSub(i, idx)}
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        ))}

        <div className="flex justify-start gap-3 pt-4">
          <button
            onClick={handleAddCategory}
            className="btn btn-primary btn-md shadow hover:scale-105 transition-transform"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Add New Category
          </button>
        </div>

        {/* Input Modal */}
        {modalOpen && (
          <dialog className="modal modal-open">
            <div className="modal-box bg-base-100 text-base-content">
              <h3 className="font-bold text-lg mb-2">{modalTitle}</h3>
              <input
                type="text"
                className="input input-bordered w-full"
                value={modalValue}
                onChange={(e) => setModalValue(e.target.value)}
                placeholder="Enter name"
              />
              <div className="modal-action">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    modalOnConfirm(modalValue);
                    setModalOpen(false);
                  }}
                >
                  Save
                </button>
                <button className="btn btn-active" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </dialog>
        )}

        {/* Confirm Modal */}
        {confirmOpen && (
          <dialog className="modal modal-open">
            <div className="modal-box bg-base-100 text-base-content">
              <h3 className="text-lg">{confirmMessage}</h3>
              <div className="modal-action">
                <button className="btn btn-error" onClick={confirmOnYes}>
                  Yes
                </button>
                <button className="btn" onClick={() => setConfirmOpen(false)}>
                  No
                </button>
              </div>
            </div>
          </dialog>
        )}
      </div>
    </div>
  </div>
);

}
