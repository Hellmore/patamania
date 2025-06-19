import { Modal, Button, Space } from 'antd';
import '@ant-design/v5-patch-for-react-19';
import { DeleteFilled, ExclamationCircleFilled } from '@ant-design/icons';

const { confirm } = Modal;

export default function AlertDelecao({ onConfirm, onCancel }) {
    const showConfirm = () => {
        confirm({
            title: 'Tem certeza que deseja excluir este serviço?',
            icon: <ExclamationCircleFilled />,
            content: 'Esta ação não pode ser desfeita.',
            okText: 'Deletar',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk() {
                onConfirm();
            },
            onCancel() {
                onCancel && onCancel();
            },
        });
    };

    return (
        <Button
            danger
            icon={<DeleteFilled />}
            onClick={showConfirm}
        >
            Deletar
        </Button>
    );
}