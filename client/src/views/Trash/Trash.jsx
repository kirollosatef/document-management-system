import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import UniTable from "@components/Common/UniversalTable/UniTable";
import Loading from "@components/Common/Loading/Loading";
import { toast } from "react-toastify";
import { getTrashArchives, restoreArchiveFromTrash, permanentlyDeleteArchive } from "@store/folders/foldersActions";
import {
  resetSelectedItem,
  setPageName,
  setAdd,
  setUpdate,
  setRemove,
  setSelectedItem
} from "@store/toolsbar/toolsbarSlice";
import RestoreIcon from '@mui/icons-material/Restore';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { reset } from "@store/folders/foldersSlice";

function TrashPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { trashArchives, loading, error, message } = useSelector((state) => state.folders);
  const { selectedItem } = useSelector((state) => state.toolsbar.components);
  const [openRestoreModal, setOpenRestoreModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleRestore = () => {
    if (selectedItem?.item?._id) {
      dispatch(restoreArchiveFromTrash(selectedItem.item._id));
      setOpenRestoreModal(false);
      // dispatch(getTrashArchives());
      window.location.reload();
    } else {
      console.error('Attempted to restore archive with undefined _id', selectedItem);
      toast.error('Error: Unable to restore archive. Please try again.');
    }
  };

  const handleDelete = () => {
    if (selectedItem?.item?._id) {
      dispatch(permanentlyDeleteArchive(selectedItem.item._id));
      setOpenDeleteModal(false);
      // dispatch(getTrashArchives());
      window.location.reload();
    } else {
      console.error('Attempted to delete archive with undefined _id', selectedItem);
      toast.error('Error: Unable to delete archive. Please try again.');
    }
  };

  const handleDoubleClick = (obj) => {
    console.log('Double-clicked object:', obj); // Log the entire object for debugging
    if (obj && obj._id) {
      if (selectedItem?.item?._id === obj._id) {
        navigate(`/archives/${obj._id}`);
      } else {
        dispatch(setSelectedItem({ type: "archive", item: obj }));
      }
    } else {
      console.error('Attempted to handle double click on object with undefined _id', obj);
      toast.error('Error: Unable to open archive. Please check the console for more details.');
    }
  };

  const headers = [
    { id: "title", label: "عنوان الأرشيف" },
    { id: "issueNumber", label: "رقم الإصدار" },
    { id: "deletedBy", label: "حذف بواسطة" },
    { id: "deletedAt", label: "تاريخ الحذف" },
    { id: "deleteReason", label: "سبب الحذف" },
    { id: "actions", label: "الإجراءات" },
  ];

  const rowActions = [
    {
      icon: <RestoreIcon />,
      onClick: (item) => {
        console.log('Restore clicked for item:', item);
        dispatch(setSelectedItem({ type: "archive", item: item }));
        setOpenRestoreModal(true);
      },
      color: "primary",
      tooltip: "استعادة"
    },
    {
      icon: <DeleteForeverIcon />,
      onClick: (item) => {
        console.log('Delete clicked for item:', item); // Log the item for debugging
        dispatch(setSelectedItem({ type: "archive", item: item }));
        setOpenDeleteModal(true);
      },
      color: "error",
      tooltip: "حذف نهائي"
    },
  ];

  useEffect(() => {
    dispatch(getTrashArchives());
    dispatch(resetSelectedItem());
    dispatch(setPageName("سلة المحذوفات"));
    dispatch(setAdd(false));
    dispatch(setUpdate(false));
    dispatch(setRemove(false));
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(message);
      dispatch(reset());
    }
  }, [error, message, dispatch]);

  useEffect(() => {
    console.log('trashArchives:', trashArchives); // Log the trashArchives for debugging
  }, [trashArchives]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Grid container>
          <Grid item xs={12} sx={{ overflow: "hidden" }}>
            <UniTable
              headers={headers}
              data={trashArchives || []}
              title="سلة المحذوفات"
              handleClick={handleDoubleClick}
              selectedItem={selectedItem?.item}
              noDataMsg="لا توجد أرشيفات في سلة المحذوفات"
              rowActions={rowActions}
            />
          </Grid>
        </Grid>
      )}

      {/* Restore Confirmation Modal */}
      <Dialog
        open={openRestoreModal}
        onClose={() => setOpenRestoreModal(false)}
        aria-labelledby="restore-dialog-title"
        aria-describedby="restore-dialog-description"
      >
        <DialogTitle id="restore-dialog-title">{"تأكيد الاستعادة"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="restore-dialog-description">
            هل أنت متأكد أنك تريد استعادة هذا الأرشيف؟
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRestoreModal(false)} color="primary">
            إلغاء
          </Button>
          <Button onClick={handleRestore} color="primary" autoFocus>
            تأكيد
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">{"تأكيد الحذف النهائي"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            هل أنت متأكد أنك تريد حذف هذا الأرشيف نهائيًا؟ لا يمكن التراجع عن هذا الإجراء.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteModal(false)} color="primary">
            إلغاء
          </Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            تأكيد الحذف
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default TrashPage;