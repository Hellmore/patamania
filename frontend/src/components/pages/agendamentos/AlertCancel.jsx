import { Modal, Button } from 'antd';
import '@ant-design/v5-patch-for-react-19';
import { ExclamationCircleFilled } from '@ant-design/icons';

const { confirm } = Modal;

export default function AlertCancel({ onConfirm, onCancel }) {
    const showConfirm = () => {
        confirm({
            title: 'Tem certeza que deseja cancelar o agendamento?',
            icon: <ExclamationCircleFilled />,
            content: 'Esta ação não poderá ser desfeita.',
            okText: 'Cancelar Agendamento',
            okType: 'danger',
            cancelText: 'Fechar',
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
            onClick={showConfirm}
        >
            Cancelar Agendamento
        </Button>
    );
}