'use strict';

const table = document.getElementById('periodic-table');
table.innerHTML = '';

tableLayout.forEach((row, rowIndex) => {
	row.forEach((cell, colIndex) => {
		if (cell !== null && elements[cell]) {
			const el = elements[cell];
			const div = document.createElement('div');
			div.className = 'element';
			div.style.gridColumn = (colIndex + 1);
			div.style.gridRow = (rowIndex + 1);
			div.innerHTML = `<span class="element-number">${el.number}</span><span class="element-symbol">${el.symbol}</span>`;
			
			listener.add(div, 'click', () => {
				showModal(el);
			});
			
			table.appendChild(div);
		}
	});
});

const modal = document.getElementById('element-modal');
const closeModal = document.getElementById('close-modal');

listener.add(closeModal, 'click', () => {
	modal.classList.add('hidden');
});

listener.add(modal, 'click', (e) => {
	if (e.target === modal) modal.classList.add('hidden');
});

const toggleBtn = document.getElementById('toggle-dark');

listener.add(toggleBtn, 'click', () => {
	document.body.classList.toggle('dark-mode');
	localStorage.setItem('periodicTableDarkMode', document.body.classList.contains('dark-mode'));
});

if (localStorage.getItem('periodicTableDarkMode') === 'true') {
	document.body.classList.add('dark-mode');
}

function showModal(el) {
	const header = `<div class="modal-header"><span class="modal-symbol">${el.symbol}</span><span class="modal-title">${el.name}</span></div>`;
	const row1 = `<div class="modal-row">
		<div class="modal-col"><strong>Atomic Number:</strong> ${el.number}</div>
		<div class="modal-col"><strong>Atomic Mass:</strong> ${el.atomicMass || '-'}</div>
		<div class="modal-col"><strong>Category:</strong> ${el.category || '-'}</div>
		<div class="modal-col"><strong>State:</strong> ${el.state || '-'}</div>
	</div>`;
	const row2 = `<div class="modal-row">
		<div class="modal-col"><strong>Electron Config:</strong> ${el.electronConfig || '-'}</div>
		<div class="modal-col"><strong>Discovered:</strong> ${el.discovered || '-'}</div>
		<div class="modal-col"><strong>Density:</strong> ${el.density || '-'}</div>
	</div>`;
	const row3 = `<div class="modal-row">
		<div class="modal-col"><strong>Melting Point:</strong> ${el.meltingPoint || '-'}</div>
		<div class="modal-col"><strong>Boiling Point:</strong> ${el.boilingPoint || '-'}</div>
		<div class="modal-col"><strong>Electronegativity:</strong> ${el.electronegativity || '-'}</div>
		<div class="modal-col"><strong>Abundance:</strong> ${el.abundance || '-'}</div>
	</div>`;
	const desc = `<div class="modal-row"><div class="modal-col"><strong>Description:</strong> ${el.desc || '-'}</div></div>`;
	const uses = `<div class="modal-row"><div class="modal-col"><strong>Common Uses:</strong> ${el.uses || '-'}</div></div>`;
	const fact = el.fact ? `<div class="modal-fact">${el.fact}</div>` : '';
	document.getElementById('element-name').innerHTML = '';
	document.getElementById('element-desc').innerHTML = header + row1 + row2 + row3 + desc + uses + fact;
	document.getElementById('element-uses').textContent = '';
	document.getElementById('element-modal').classList.remove('hidden');
}